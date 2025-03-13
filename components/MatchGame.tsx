import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { questionsSchema } from '@/lib/schemas';

interface MatchGameProps {
  questions: z.infer<typeof questionsSchema>;
  onComplete?: () => void;
  isRestarted?: boolean;
}

export default function MatchGame({ questions, onComplete }: MatchGameProps) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  // Create cards with full answer text instead of just the letter
  const [allCards] = useState(() => {
    const cards = [
      ...questions.map((q, i) => ({
        id: i,
        content: q.question,
        type: 'question',
      })),
      ...questions.map((q, i) => ({
        id: i,
        content: q.answer.explanation,
        type: 'answer',
      })),
    ].sort(() => Math.random() - 0.5);
    return cards;
  });

  // Add a reset function
  const resetGame = () => {
    setSelectedCards([]);
    setMatchedPairs([]);
  };

  const handleCardClick = (index: number, id: number) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.includes(index)) return;
    if (matchedPairs.includes(id)) return;

    setSelectedCards([...selectedCards, index]);

    if (selectedCards.length === 1) {
      const firstCard = allCards[selectedCards[0]];
      const secondCard = allCards[index];

      if (
        firstCard.id === secondCard.id &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs([...matchedPairs, firstCard.id]);
        setSelectedCards([]);

        if (matchedPairs.length + 1 === questions.length) {
          onComplete?.();
        }
      } else {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {allCards.map((card, index) => (
        <motion.div
          key={`${card.type}-${index}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={`cursor-pointer ${
              selectedCards.includes(index) || matchedPairs.includes(card.id)
                ? 'bg-green-100 dark:bg-green-900'
                : ''
            }`}
            onClick={() => handleCardClick(index, card.id)}
          >
            <CardContent className='p-4'>
              <p className='text-sm text-center'>{card.content}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
