'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '@/components/quiz';
import { useStudySetStore } from '@/lib/store';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const { questions, title } = useStudySetStore();

  useEffect(() => {
    if (questions.length === 0) {
      router.push('/');
    }
  }, [questions.length, router]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='max-w-3xl mx-auto'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{title} - Quiz</span>
            <Button variant='outline' onClick={() => router.push('/')}>
              <Home className='h-4 w-4 mr-2' />
              Home
            </Button>
          </CardTitle>
        </CardHeader>
        <Quiz />
      </Card>
    </div>
  );
}
