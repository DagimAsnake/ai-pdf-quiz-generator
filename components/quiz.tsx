'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudySetStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

export default function Quiz() {
  const router = useRouter();
  const { questions, title, updateStats } = useStudySetStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Set<string>[]>(
    new Array(questions.length).fill(null).map(() => new Set())
  );
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // If no questions, return to home
  if (questions.length === 0) {
    return null;
  }
  console.log(questions);
  const currentQuestion = questions[currentQuestionIndex];
  const isMultipleAnswer = currentQuestion.answer.type === 'multiple';

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    const currentAnswers = new Set(newAnswers[currentQuestionIndex]);

    if (isMultipleAnswer) {
      if (currentAnswers.has(answer)) {
        currentAnswers.delete(answer);
      } else {
        currentAnswers.add(answer);
      }
    } else {
      currentAnswers.clear();
      currentAnswers.add(answer);
    }

    newAnswers[currentQuestionIndex] = currentAnswers;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = (questionIndex: number) => {
    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];

    if (question.answer.type === 'multiple') {
      const correctAnswers = new Set(question.answer.value as string[]);
      return (
        userAnswer.size === correctAnswers.size &&
        [...userAnswer].every((answer) => correctAnswers.has(answer))
      );
    } else {
      return userAnswer.has(question.answer.value as string);
    }
  };

  const handleNext = () => {
    const isCorrect = checkAnswer(currentQuestionIndex);

    if (currentQuestionIndex === questions.length - 1) {
      const finalScore = isCorrect ? score + 1 : score;
      setScore(finalScore);
      setShowResults(true);
      updateStats('quiz');
    } else {
      if (isCorrect) setScore(score + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null).map(() => new Set()));
    setScore(0);
    setShowResults(false);
  };

  const handleReturn = () => {
    router.push('/');
  };

  if (showResults) {
    return (
      <Card className='w-full max-w-3xl mx-auto'>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='text-lg font-semibold mb-4'>
            You scored {score} out of {questions.length}!
          </div>

          {/* Questions Review */}
          <div className='space-y-8'>
            {questions.map((question, index) => {
              const isCorrect = checkAnswer(index);
              const userAnswer = userAnswers[index];

              return (
                <div key={index} className='border rounded-lg p-4'>
                  <div className='flex items-start gap-2'>
                    <div className='mt-1'>
                      {isCorrect ? (
                        <Check className='h-5 w-5 text-green-500' />
                      ) : (
                        <X className='h-5 w-5 text-red-500' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium mb-2'>
                        Question {index + 1}: {question.question}
                      </p>
                      {question.answer.type === 'multiple' && (
                        <p className='text-sm text-muted-foreground mb-2'>
                          (Multiple answers required)
                        </p>
                      )}
                      <div className='space-y-2'>
                        {question.options.map((option) => {
                          const isUserSelection = userAnswer.has(option);
                          const isCorrectAnswer = Array.isArray(
                            question.answer.value
                          )
                            ? question.answer.value.includes(option)
                            : option === question.answer.value;

                          return (
                            <div
                              key={option}
                              className={`p-3 rounded ${
                                isUserSelection
                                  ? isCorrectAnswer
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100'
                                  : isCorrectAnswer
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100'
                                  : 'bg-zinc-100 dark:bg-zinc-800'
                              }`}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>
                      <div className='mt-4 text-sm text-muted-foreground'>
                        {question.answer.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='flex gap-4 pt-4'>
            <Button onClick={handleRetry}>Try Again</Button>
            <Button variant='outline' onClick={handleReturn}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <CardContent className='max-w-3xl mx-auto'>
      <div className='space-y-4'>
        <div className='text-sm text-muted-foreground'>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className='text-lg font-medium mb-6'>
          {currentQuestion.question}
        </div>
        {isMultipleAnswer && (
          <div className='text-sm text-muted-foreground mb-2'>
            Select all correct answers
          </div>
        )}
        <div className='grid gap-3'>
          {currentQuestion.options.map((option) => {
            return (
              <Button
                key={option}
                variant={
                  userAnswers[currentQuestionIndex].has(option)
                    ? 'default'
                    : 'outline'
                }
                className='w-full text-left h-auto py-3 px-4 whitespace-normal'
                onClick={() => handleAnswerSelect(option)}
              >
                <span className='flex-1'>{option}</span>
              </Button>
            );
          })}
        </div>
        <Button
          onClick={handleNext}
          disabled={userAnswers[currentQuestionIndex].size === 0}
          className='w-full mt-6'
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </CardContent>
  );
}
