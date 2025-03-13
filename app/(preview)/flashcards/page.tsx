'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashCard from '@/components/FlashCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStudySetStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { title, questions, updateStats } = useStudySetStore();

  // Move the redirect to useEffect
  useEffect(() => {
    if (questions.length === 0) {
      router.push('/');
    }
  }, [questions.length, router]);

  // If no questions, return null without redirecting
  if (questions.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      updateStats('flashcards');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{title} - Flashcards</span>
            <Button variant='outline' onClick={() => router.push('/')}>
              <Home className='h-4 w-4 mr-2' />
              Home
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='max-w-2xl mx-auto'>
            <div className='flex items-center justify-between mb-8'>
              <Button
                variant='outline'
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className='h-4 w-4 mr-2' />
                Previous
              </Button>
              <span className='text-sm'>
                {currentIndex + 1} / {questions.length}
              </span>
              <Button
                variant='outline'
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
              >
                Next
                <ChevronRight className='h-4 w-4 ml-2' />
              </Button>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <FlashCard
                  term={questions[currentIndex].question}
                  options={questions[currentIndex].options}
                  answer={questions[currentIndex].answer}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
