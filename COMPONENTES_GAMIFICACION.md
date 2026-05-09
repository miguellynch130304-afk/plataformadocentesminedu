# 🛠️ COMPONENTES REACT - IMPLEMENTACIÓN GAMIFICADA

Este archivo contiene ejemplos de componentes React/TypeScript que implementan las mecánicas gamificadas sugeridas para la Clase N°16.

> **Nota:** Estos son fragmentos base. Adaptables según tu stack actual (Next.js 16, Tailwind 4, Lucide React).

---

## 1️⃣ Sistema XP - Hook Personalizado

```typescript
// hooks/useXPSystem.ts

import { useState, useCallback } from 'react';

interface XPEvent {
  type: 'quiz_correct' | 'checkpoint' | 'exercise' | 'bonus' | 'streak';
  amount: number;
  message: string;
  streak?: number;
}

interface UseXPSystemReturn {
  totalXP: number;
  currentStreak: number;
  addXP: (event: XPEvent) => void;
  resetStreak: () => void;
  getMultiplier: () => number;
}

export function useXPSystem(): UseXPSystemReturn {
  const [totalXP, setTotalXP] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const getMultiplier = useCallback((): number => {
    if (currentStreak >= 3) return 1.5;
    if (currentStreak >= 2) return 1.25;
    return 1;
  }, [currentStreak]);

  const addXP = useCallback((event: XPEvent) => {
    const multiplier = getMultiplier();
    const finalXP = Math.floor(event.amount * multiplier);
    
    setTotalXP(prev => prev + finalXP);
    
    if (event.type !== 'bonus') {
      setCurrentStreak(prev => prev + 1);
    }
  }, [getMultiplier]);

  const resetStreak = useCallback(() => {
    setCurrentStreak(0);
  }, []);

  return {
    totalXP,
    currentStreak,
    addXP,
    resetStreak,
    getMultiplier
  };
}
```

---

## 2️⃣ Componente XP Toast Notification

```typescript
// components/XPNotification.tsx

'use client'

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface XPNotificationProps {
  amount: number;
  message?: string;
  isBonus?: boolean;
  streak?: number;
}

export default function XPNotification({
  amount,
  message,
  isBonus = false,
  streak = 1
}: XPNotificationProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getColor = () => {
    if (amount >= 100) return 'text-yellow-500';
    if (amount >= 50) return 'text-orange-500';
    if (amount >= 25) return 'text-green-500';
    return 'text-blue-500';
  };

  const getEmoji = () => {
    if (streak >= 3) return '🔥';
    if (isBonus) return '⭐';
    return '✨';
  };

  return (
    <div
      className={`fixed top-20 right-4 translate-y-0 transition-all duration-300 ${
        animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-96'
      }`}
    >
      <div className={`flex items-center gap-2 bg-white rounded-lg shadow-lg p-4 border-l-4 ${
        amount >= 100 ? 'border-yellow-500' : 
        amount >= 50 ? 'border-orange-500' : 
        amount >= 25 ? 'border-green-500' : 'border-blue-500'
      }`}>
        <Zap className={`w-6 h-6 ${getColor()}`} />
        <div>
          <p className="text-sm font-bold">
            <span className={getColor()}>+{amount} XP</span>
          </p>
          {message && <p className="text-xs text-gray-600">{message}</p>}
          {streak > 1 && <p className="text-xs font-semibold text-red-500">{getEmoji()} Streak x{streak}</p>}
        </div>
      </div>
    </div>
  );
}
```

---

## 3️⃣ Barra de Progreso Gamificada

```typescript
// components/GamifiedProgressBar.tsx

'use client'

import { useMemo } from 'react';

interface ProgressSegment {
  label: string;
  percentage: number;
  status: 'completed' | 'in-progress' | 'locked';
  icon?: string;
}

interface GamifiedProgressBarProps {
  segments: ProgressSegment[];
  totalXP: number;
  maxXP: number;
  nextMilestoneXP?: number;
}

export default function GamifiedProgressBar({
  segments,
  totalXP,
  maxXP,
  nextMilestoneXP
}: GamifiedProgressBarProps) {
  const progressPercentage = useMemo(() => {
    return Math.ceil((totalXP / maxXP) * 100);
  }, [totalXP, maxXP]);

  const getSegmentColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'locked':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-900">Progreso de la Clase</h3>
          <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Shine effect */}
            <div className="h-full animate-pulse opacity-30 bg-gradient-to-r from-transparent to-white"></div>
          </div>
        </div>
      </div>

      {/* Segment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={`rounded-lg p-3 border-2 ${
              segment.status === 'completed'
                ? 'border-green-500 bg-green-50'
                : segment.status === 'in-progress'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 uppercase">
                {segment.icon} {segment.label}
              </span>
              <span className="text-xs font-bold text-slate-600">{segment.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getSegmentColor(segment.status)} transition-all duration-300`}
                style={{ width: `${segment.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Info */}
      {nextMilestoneXP && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Siguiente hito:</span> +{nextMilestoneXP - totalXP} XP
          </p>
        </div>
      )}
    </div>
  );
}
```

---

## 4️⃣ Componente Streak Counter

```typescript
// components/StreakCounter.tsx

'use client'

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  multiplier: number;
  maxStreak?: number;
}

export default function StreakCounter({
  streak,
  multiplier,
  maxStreak = 10
}: StreakCounterProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (streak > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  const getStreakColor = (): string => {
    if (streak >= maxStreak) return 'text-red-600';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-orange-400';
    return 'text-gray-400';
  };

  const warningMessage = () => {
    if (streak <= 1) return '';
    if (streak === 2) return 'Casi allá...';
    if (streak >= 3) return `¡${streak} en racha! 🔥`;
    return '';
  };

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border-2 border-orange-200 bg-orange-50 transition-all ${
      animate ? 'scale-110' : 'scale-100'
    }`}>
      <div className="flex items-center gap-1">
        {[...Array(Math.min(streak, 5))].map((_, i) => (
          <Flame
            key={i}
            className={`w-5 h-5 ${getStreakColor()} ${
              animate ? 'animate-bounce' : ''
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="flex-1">
        <p className="text-sm font-bold">
          <span className={getStreakColor()}>{streak}</span>
          <span className="text-gray-600"> respuestas</span>
        </p>
        {multiplier > 1 && (
          <p className="text-xs text-orange-600 font-semibold">
            Multiplier: x{multiplier.toFixed(1)}
          </p>
        )}
      </div>

      {warningMessage() && (
        <p className="text-xs font-bold text-red-500 animate-pulse">
          {warningMessage()}
        </p>
      )}
    </div>
  );
}
```

---

## 5️⃣ Ejercicio Gamificado Mejorado

```typescript
// components/GamifiedExercise.tsx

'use client'

import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Zap } from 'lucide-react';
import XPNotification from './XPNotification';

interface ExerciseOption {
  id: string;
  label: string;
  text: string;
}

interface GamifiedExerciseProps {
  number: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: ExerciseOption[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  baseXP: number;
  onCorrect?: (xp: number, streak: number) => void;
  onIncorrect?: () => void;
  streak?: number;
}

export default function GamifiedExercise({
  number,
  difficulty,
  question,
  options,
  correctAnswer,
  hint,
  explanation,
  baseXP,
  onCorrect,
  onIncorrect,
  streak = 0
}: GamifiedExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const getDifficultyColor = (): string => {
    switch (difficulty) {
      case 'easy': return 'from-green-50 to-green-100 border-green-300';
      case 'medium': return 'from-blue-50 to-blue-100 border-blue-300';
      case 'hard': return 'from-red-50 to-red-100 border-red-300';
    }
  };

  const getDifficultyLabel = (): string => {
    switch (difficulty) {
      case 'easy': return '🟢 FÁCIL';
      case 'medium': return '🔵 MEDIO';
      case 'hard': return '🔴 DIFÍCIL';
    }
  };

  const getDifficultyMultiplier = (): number => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 1.5;
      case 'hard': return 2;
    }
  };

  const handleVerify = () => {
    if (!selected) {
      alert('Selecciona una opción');
      return;
    }

    const correct = selected === correctAnswer;
    const multiplier = streak >= 3 ? 1.5 : 1;
    const finalXP = Math.floor(baseXP * getDifficultyMultiplier() * multiplier);

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setEarnedXP(finalXP);
      setShowXPNotification(true);
      onCorrect?.(finalXP, streak + 1);
      
      setTimeout(() => setShowXPNotification(false), 2000);
    } else {
      onIncorrect?.();
    }
  };

  return (
    <>
      {showXPNotification && (
        <XPNotification
          amount={earnedXP}
          message={`+${earnedXP} XP`}
          streak={streak + 1}
        />
      )}

      <div className={`bg-gradient-to-br ${getDifficultyColor()} rounded-lg shadow-md p-6 mb-6 border-2`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Ejercicio {number}
            </h3>
            <span className="text-xs font-semibold text-gray-600">
              {getDifficultyLabel()} • Base XP: {baseXP}
            </span>
          </div>

          {showResult && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isCorrect
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">¡Correcto!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Incorrecto</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Question */}
        <p className="text-gray-800 font-semibold mb-6 text-base">{question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : showResult && option.id === correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : showResult && selected === option.id && !isCorrect
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`exercise-${number}`}
                value={option.id}
                checked={selected === option.id}
                onChange={(e) => {
                  setSelected(e.target.value);
                  setShowResult(false);
                }}
                disabled={showResult}
                className="w-4 h-4"
              />
              <span className="ml-3 text-gray-700">
                <span className="font-semibold">{option.label})</span> {option.text}
              </span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-4">
          {!showHint && !showResult && (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Ver pista
            </button>
          )}

          {!showResult && (
            <button
              onClick={handleVerify}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Verificar
            </button>
          )}

          {showResult && (
            <button
              onClick={() => {
                setSelected(null);
                setShowResult(false);
                setShowHint(false);
              }}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition"
            >
              Siguiente →
            </button>
          )}
        </div>

        {/* Hint */}
        {showHint && !showResult && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">💡 Pista:</span> {hint}
            </p>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div
            className={`rounded-lg p-4 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect ? '✓ Respuesta correcta' : '✗ Respuesta incorrecta'}
            </p>
            <p
              className={`text-sm ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {explanation}
            </p>

            {isCorrect && (
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-xs font-bold text-green-700">
                  🎯 Patrón clave: Busca marcas temporales en el resultado
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
```

---

## 6️⃣ Checkpoint Interactivo (Flash Cards)

```typescript
// components/FlashCardBattle.tsx

'use client'

import { useState } from 'react';
import { ChevronRight, Trophy } from 'lucide-react';

interface FlashCard {
  id: number;
  front: string;
  back: string;
  hint?: string;
}

interface FlashCardBattleProps {
  cards: FlashCard[];
  onComplete?: (score: number) => void;
}

export default function FlashCardBattle({
  cards,
  onComplete
}: FlashCardBattleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [systemScore, setSystemScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  const handleCorrect = () => {
    setPlayerScore(prev => prev + 1);
    
    if (isLastCard) {
      // Calculate bonus
      const perfectBonus = playerScore + 1 === cards.length ? 50 : 0;
      setIsComplete(true);
      onComplete?.(playerScore + 1 + perfectBonus);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setFlipped(false);
      }, 500);
    }
  };

  const handleIncorrect = () => {
    setSystemScore(prev => prev + 1);
    
    if (isLastCard) {
      setIsComplete(true);
      onComplete?.(playerScore);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setFlipped(false);
      }, 500);
    }
  };

  if (isComplete) {
    const playerWon = playerScore > systemScore;
    const totalXP = playerScore * 20 + (playerWon ? 50 : 0);

    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${playerWon ? 'text-yellow-500' : 'text-gray-400'}`} />
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {playerWon ? '¡GANASTE!' : 'Sistema ganó'}
        </h3>

        <div className="bg-slate-100 rounded-lg p-6 my-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Tu puntuación</p>
              <p className="text-3xl font-bold text-blue-600">{playerScore}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">vs</p>
              <p className="text-3xl font-bold">⚔️</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sistema</p>
              <p className="text-3xl font-bold text-gray-600">{systemScore}</p>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold text-green-600 mb-4">
          +{totalXP} XP ganado
        </p>

        {playerScore === cards.length && (
          <p className="text-sm text-amber-600 font-semibold mb-4">
            🎖️ Badge "Perfect 3/3" desbloqueado
          </p>
        )}

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Siguiente actividad →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8">
      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-700 font-semibold">TÚ</p>
          <p className="text-3xl font-bold text-blue-600">{playerScore}</p>
        </div>
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-700 font-semibold">SISTEMA</p>
          <p className="text-3xl font-bold text-gray-600">{systemScore}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className={`h-64 rounded-lg shadow-lg cursor-pointer transition-all transform ${
          flipped
            ? 'bg-gradient-to-br from-green-50 to-green-100'
            : 'bg-gradient-to-br from-pink-50 to-pink-100'
        } flex items-center justify-center p-8 mb-8 perspective`}
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2 uppercase font-semibold">
            {flipped ? 'Respuesta' : 'Pregunta'}
          </p>
          <p className="text-xl font-bold text-gray-900">
            {flipped ? currentCard.back : currentCard.front}
          </p>
          <p className="text-xs text-gray-600 mt-4">[Haz click para voltear]</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleIncorrect}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          ✗ Incorrecto
        </button>
        <button
          onClick={handleCorrect}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          ✓ Correcto
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Card Info */}
      <p className="text-center text-xs text-gray-600 mt-4">
        Tarjeta {currentIndex + 1} de {cards.length}
      </p>
    </div>
  );
}
```

---

## 7️⃣ Badge Sistema

```typescript
// components/BadgeShowcase.tsx

'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlockedAt?: Date;
  locked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeShowcaseProps {
  badges: Badge[];
  newBadges?: string[];
}

export default function BadgeShowcase({
  badges,
  newBadges = []
}: BadgeShowcaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'from-gray-100 to-gray-200 border-gray-400';
      case 'rare': return 'from-blue-100 to-blue-200 border-blue-400';
      case 'epic': return 'from-purple-100 to-purple-200 border-purple-400';
      case 'legendary': return 'from-yellow-100 to-yellow-200 border-yellow-400';
    }
    return '';
  };

  return (
    <div className="space-y-4">
      {/* New Badges Alert */}
      {newBadges.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 text-center">
          <p className="text-sm font-bold text-amber-800">
            🎉 {newBadges.length} badge{newBadges.length > 1 ? 's' : ''} desbloqueado{newBadges.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Badge Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {badges.map((badge) => (
          <button
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center text-center p-2 transition-all hover:shadow-lg cursor-pointer ${
              badge.locked
                ? 'bg-gray-200 border-gray-400 opacity-50 text-gray-500'
                : `bg-gradient-to-br ${getRarityColor(badge.rarity)} ${
                    newBadges.includes(badge.id)
                      ? 'ring-4 ring-yellow-400 animate-pulse'
                      : ''
                  }`
            }`}
          >
            <span className={`text-3xl ${badge.locked ? 'grayscale' : ''}`}>
              {badge.emoji}
            </span>
          </button>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedBadge.name}
              </h3>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-4">
              <span className="text-6xl">{selectedBadge.emoji}</span>
            </div>

            <p className="text-sm text-gray-600 text-center mb-4">
              {selectedBadge.description}
            </p>

            <div className="bg-gray-100 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Rareza
              </p>
              <p className="text-sm font-bold capitalize text-gray-900">
                {selectedBadge.rarity}
              </p>
            </div>

            {selectedBadge.unlockedAt && (
              <p className="text-xs text-gray-600 text-center mt-4">
                Desbloqueado: {selectedBadge.unlockedAt.toLocaleDateString()}
              </p>
            )}

            {selectedBadge.locked && (
              <p className="text-xs text-amber-600 text-center mt-4 font-semibold">
                🔒 Bloqueado - Continúa tu progreso para desbloquear
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 8️⃣ Adaptive Difficulty Hook

```typescript
// hooks/useAdaptiveDifficulty.ts

import { useState, useCallback, useMemo } from 'react';

type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface UseAdaptiveDifficultyReturn {
  currentLevel: DifficultyLevel;
  successRate: number;
  adjustDifficulty: (isCorrect: boolean) => void;
  suggestedAction: string;
}

export function useAdaptiveDifficulty(
  initialLevel: DifficultyLevel = 'medium'
): UseAdaptiveDifficultyReturn {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(initialLevel);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);

  const successRate = useMemo(() => {
    if (totalAttempts === 0) return 0;
    return (correctAttempts / totalAttempts) * 100;
  }, [correctAttempts, totalAttempts]);

  const suggestedAction = useMemo(() => {
    if (successRate >= 85 && currentLevel !== 'hard') {
      return 'Aumentando dificultad...';
    }
    if (successRate < 60 && currentLevel !== 'easy') {
      return 'Reduciendo dificultad (opcional)...';
    }
    if (successRate >= 90) {
      return 'Desafío especial disponible';
    }
    return '';
  }, [successRate, currentLevel]);

  const adjustDifficulty = useCallback((isCorrect: boolean) => {
    setTotalAttempts(prev => prev + 1);
    if (isCorrect) {
      setCorrectAttempts(prev => prev + 1);
    }

    // After 5 attempts, evaluate
    if ((totalAttempts + 1) % 5 === 0) {
      const rate = ((correctAttempts + (isCorrect ? 1 : 0)) / (totalAttempts + 1)) * 100;

      if (rate >= 85 && currentLevel === 'easy') {
        setCurrentLevel('medium');
      } else if (rate >= 85 && currentLevel === 'medium') {
        setCurrentLevel('hard');
      } else if (rate < 60 && currentLevel === 'hard') {
        setCurrentLevel('medium');
      }
    }
  }, [totalAttempts, correctAttempts]);

  return {
    currentLevel,
    successRate,
    adjustDifficulty,
    suggestedAction
  };
}
```

---

## 9️⃣ Warm-up Diagnostic Component

```typescript
// components/WarmupDiagnostic.tsx

'use client'

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface WarmupQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium';
}

interface WarmupDiagnosticProps {
  questions: WarmupQuestion[];
  onComplete?: (route: 'A' | 'B' | 'C', score: number) => void;
}

export default function WarmupDiagnostic({
  questions,
  onComplete
}: WarmupDiagnosticProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = () => {
    if (!selected) return;

    const isCorrect = selected === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowFeedback(true);

    setTimeout(() => {
      if (isLastQuestion) {
        completeWarmup(score + (isCorrect ? 1 : 0));
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setShowFeedback(false);
      }
    }, 1500);
  };

  const completeWarmup = (finalScore: number) => {
    setIsComplete(true);

    // Determine route based on score
    let route: 'A' | 'B' | 'C';
    if (finalScore <= 1) route = 'A'; // Slow route
    else if (finalScore === 2) route = 'B'; // Normal route
    else route = 'C'; // Fast route

    onComplete?.(route, finalScore);
  };

  if (isComplete) {
    const routes = {
      A: { name: 'Ruta Lenta', color: 'blue', message: 'Vamos a aprender paso a paso' },
      B: { name: 'Ruta Normal', color: 'green', message: 'Ritmo perfecto para aprender' },
      C: { name: 'Ruta Acelerada', color: 'purple', message: 'Domina los conceptos rápidamente' }
    };

    const route = score <= 1 ? 'A' : score === 2 ? 'B' : 'C';
    const routeInfo = routes[route];

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagnóstico Completado ✓</h2>
        <p className={`text-lg font-semibold text-${routeInfo.color}-600 mb-2`}>
          {routeInfo.name}
        </p>
        <p className="text-gray-600 mb-6">{routeInfo.message}</p>
        <p className="text-sm text-gray-600 mb-8">Score: {score}/2</p>
        
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition inline-flex items-center gap-2"
        >
          Comenzar Clase <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {score} correctas
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            disabled={showFeedback}
            className={`w-full text-left p-3 rounded-lg border-2 transition ${
              selected === option.id
                ? 'border-blue-500 bg-blue-50'
                : showFeedback && option.id === currentQuestion.correctAnswer
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`rounded-lg p-4 mb-6 ${
          selected === currentQuestion.correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`text-sm font-semibold ${
            selected === currentQuestion.correctAnswer
              ? 'text-green-800'
              : 'text-red-800'
          }`}>
            {selected === currentQuestion.correctAnswer
              ? '✓ ¡Correcto!'
              : '✗ Incorrecto'}
          </p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleAnswer}
        disabled={!selected || showFeedback}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
      >
        {isLastQuestion ? 'Completar Diagnóstico' : 'Siguiente Pregunta'}
      </button>
    </div>
  );
}
```

---

## 📦 CÓMO USAR ESTOS COMPONENTES

### Integración en tu página actual:

```typescript
// app/(dashboard)/english/week/[weekNumber]/page.tsx

'use client'

import { useState, use } from 'react'
import GamifiedExercise from '@/components/GamifiedExercise'
import GamifiedProgressBar from '@/components/GamifiedProgressBar'
import StreakCounter from '@/components/StreakCounter'
import { useXPSystem } from '@/hooks/useXPSystem'

export default function WeekPage({ params }: PageProps) {
  const { totalXP, currentStreak, addXP, getMultiplier } = useXPSystem()
  
  // ... resto del código
  
  return (
    <div>
      {/* Barra de progreso gamificada */}
      <GamifiedProgressBar
        segments={[
          { label: 'Microbloque 1', percentage: 100, status: 'completed', icon: '✓' },
          { label: 'Microbloque 2', percentage: 100, status: 'completed', icon: '✓' },
          { label: 'Checkpoint 1', percentage: 100, status: 'completed', icon: '✓' },
          { label: 'Laboratorio', percentage: 60, status: 'in-progress', icon: '⚙️' },
        ]}
        totalXP={totalXP}
        maxXP={500}
        nextMilestoneXP={250}
      />

      {/* Contador de streak */}
      <StreakCounter streak={currentStreak} multiplier={getMultiplier()} />

      {/* Ejercicios gamificados */}
      {EXERCISES.map((exercise, i) => (
        <GamifiedExercise
          key={i}
          number={exercise.number}
          difficulty={i <= 2 ? 'easy' : i <= 5 ? 'medium' : 'hard'}
          question={exercise.question}
          options={exercise.options}
          correctAnswer={exercise.correctAnswer}
          hint={exercise.hint}
          explanation={exercise.explanation}
          baseXP={15}
          onCorrect={(xp, streak) => addXP({
            type: 'exercise',
            amount: xp,
            message: `Ejercicio ${exercise.number} correcto`,
            streak
          })}
        />
      ))}
    </div>
  )
}
```

---

**Próximos pasos:**
1. Adaptar colores a tu branding
2. Agregar de sonidos (opcional con `next-audio`)
3. Implementar persistencia en base de datos
4. Conectar con sistema de autenticación actual
5. Crear panel de analytics para docentes

---

**Nota:** Este código es modular y extensible. Cada componente puede usarse de forma independiente.
