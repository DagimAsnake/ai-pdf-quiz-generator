import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface FlashCardProps {
  term: string;
  options: string[];
  answer: {
    type: 'single' | 'multiple' | 'all';
    value: string | string[];
    explanation: string;
  };
}

export default function FlashCard({ term, answer, options }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className='w-full h-[300px] perspective-1000'
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className='relative w-full h-full'
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Question Side */}
        <Card
          className='absolute w-full h-full backface-hidden cursor-pointer'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 0 : 1,
          }}
        >
          <CardContent className='flex items-center justify-center h-full p-6'>
            <div className='text-center'>
              <p className='text-xl font-semibold mb-4'>{term}</p>
              <p className='text-sm text-muted-foreground'>
                Click to see answer
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Answer Side */}
        <Card
          className='absolute w-full h-full backface-hidden cursor-pointer'
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 1 : 0,
          }}
        >
          <CardContent className='flex items-center justify-center h-full p-6'>
            <div className='text-center'>
              {/* <p className='text-xl mb-4'>{answer.explanation}</p> */}
              <p className='text-xl'>
                {Array.isArray(answer.value)
                  ? `${answer.value.join(', ')}`
                  : `${answer.value}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
