'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MatchGame from '@/components/MatchGame';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStudySetStore } from '@/lib/store';

export default function MatchPage() {
  const router = useRouter();
  const [gameComplete, setGameComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [key, setKey] = useState(0);
  const { title, questions, updateStats } = useStudySetStore();

  // Move all useEffect hooks to the top, before any conditional returns
  useEffect(() => {
    if (questions.length === 0) {
      router.push('/');
    }
  }, [questions.length, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!gameComplete) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameComplete]);

  // Move the conditional return after all hooks
  if (questions.length === 0) {
    return null;
  }

  const handleGameComplete = () => {
    setGameComplete(true);
    updateStats('match');
  };

  const handleRestart = () => {
    setGameComplete(false);
    setTimeElapsed(0);
    setKey((prev) => prev + 1);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{title} - Match Game</span>
            <div className='flex gap-4'>
              <Button variant='outline' onClick={() => router.push('/')}>
                <Home className='h-4 w-4 mr-2' />
                Home
              </Button>
              <Button variant='outline' onClick={handleRestart}>
                <RefreshCw className='h-4 w-4 mr-2' />
                Restart
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-sm mb-4'>
            Time: {Math.floor(timeElapsed / 60)}:
            {(timeElapsed % 60).toString().padStart(2, '0')}
          </div>
          <MatchGame
            key={key}
            questions={questions}
            onComplete={handleGameComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
