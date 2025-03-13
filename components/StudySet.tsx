import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { questionsSchema } from '@/lib/schemas';
import { useStudySetStore } from '@/lib/store';

interface StudySetProps {
  onModeSelect: (mode: 'flashcards' | 'quiz' | 'match') => void;
}

export default function StudySet({ onModeSelect }: StudySetProps) {
  const { title, questions, stats } = useStudySetStore();

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-3 gap-4 mb-6'>
            <div className='text-center'>
              <p className='text-2xl font-bold'>{stats.flashcardsReviewed}</p>
              <p className='text-sm text-gray-500'>Cards Reviewed</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold'>{stats.quizzesTaken}</p>
              <p className='text-sm text-gray-500'>Quizzes Taken</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold'>{stats.matchesCompleted}</p>
              <p className='text-sm text-gray-500'>Matches Won</p>
            </div>
          </div>
          <p className='text-lg text-center text-white mb-5'>
            Choose a mode to start studying
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Button
              variant='outline'
              onClick={() => onModeSelect('flashcards')}
              className='flex items-center gap-2'
            >
              Flashcards
            </Button>
            <Button
              variant='outline'
              onClick={() => onModeSelect('quiz')}
              className='flex items-center gap-2'
            >
              Quiz
            </Button>
            <Button
              variant='outline'
              onClick={() => onModeSelect('match')}
              className='flex items-center gap-2'
            >
              Match
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
