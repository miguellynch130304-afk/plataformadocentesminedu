'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Lightbulb, Headphones, FileText } from 'lucide-react'
import AudioInteractiveActivity from '@/components/Gamification/AudioInteractiveActivity'

const WEEK_TITLES: Record<number, string> = {
  1: 'State vs. Action Verbs',
  2: 'Present Perfect Simple vs. Continuous',
  3: 'Narrative Tenses I',
  4: 'Narrative Tenses II',
  5: 'Used to / Would / Get used to',
  6: 'Future Forms I',
  7: 'Future Forms II',
  8: 'Review & Integration',
  9: 'Modal Verbs of Ability & Permission',
  10: 'Modals of Deduction (Present)',
  11: 'Modals of Deduction (Past)',
  12: 'The Passive Voice I',
  13: 'The Passive Voice II',
  14: 'Conditionals Zero & First',
  15: 'Second & Third Conditionals',
  16: 'Mixed Conditionals',
  17: 'Reported Speech I',
  18: 'Reported Speech II',
  19: 'Relative Clauses',
  20: 'Gerunds vs. Infinitives I',
  21: 'Gerunds vs. Infinitives II',
  22: 'Inversion for Emphasis',
  23: 'Cleft Sentences',
  24: 'Discourse Markers & Cohesion'
}

interface PageProps {
  params: Promise<{ weekNumber: string }>
}

export default function WeekPage({ params }: PageProps) {
  const { weekNumber } = use(params)
  const weekNum = parseInt(weekNumber)
  const title = WEEK_TITLES[weekNum] || 'Semana'
  const [activeTab, setActiveTab] = useState('theory')

  const tabs = [
    { id: 'theory', label: 'Concept', icon: BookOpen },
    { id: 'practice', label: 'Laboratory', icon: Lightbulb },
    ...(weekNum === 16 ? [
      { id: 'reading', label: 'Reading', icon: FileText },
      { id: 'listening', label: 'Listening', icon: Headphones },
      { id: 'exam', label: 'Exam Preparation', icon: FileText }
    ] : [])
  ]

  const renderContent = () => {
    if (activeTab === 'theory') {
      if (weekNum === 16) return <Theory16 />
      return <Placeholder type="Theory" />
    }
    if (activeTab === 'practice') {
      if (weekNum === 16) return <Practice16 />
      return <Placeholder type="Laboratory" />
    }
    if (activeTab === 'reading' && weekNum === 16) return <Reading16 />
    if (activeTab === 'listening' && weekNum === 16) return <Listening16 />
    if (activeTab === 'exam' && weekNum === 16) return <ExamPrep16 />
    return <Placeholder type="Content" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/english"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to index
          </Link>
          
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">Week {String(weekNum).padStart(2, '0')}</p>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200 -mb-px flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  )
}

function Placeholder({ type }: { type: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center py-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{type} Under Construction</h2>
      <p className="text-slate-600">The content for this week will be available soon.</p>
    </div>
  )
}

function Theory16() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Concept</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>Mixed Conditionals</strong> connect a condition from one time period with a result from another. 
          Unlike the Third Conditional which occurs entirely in the past, here we imagine a temporal connection 
          between different time periods: the condition and its consequence occur at different times.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
          <p className="text-blue-900 font-semibold mb-2">Key Point:</p>
          <p className="text-blue-800">
            The cause and the result do not occur at the same time. One happened in the past and affects the present, or vice versa.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Past → Present</h3>
            <p className="text-green-800 font-mono text-sm mb-3">If + Past Perfect, would + base verb</p>
            <p className="text-green-700 text-sm">
              The condition occurred in the past, but the result is still visible in the present.
            </p>
            <p className="text-green-700 text-sm mt-3 italic">
              If I had studied → I would be better now
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Present → Past</h3>
            <p className="text-orange-800 font-mono text-sm mb-3">If + Past Simple, would have + past participle</p>
            <p className="text-orange-700 text-sm">
              The condition is a hypothetical present situation, but the result refers to the past.
            </p>
            <p className="text-orange-700 text-sm mt-3 italic">
              If I were smarter now → I would have succeeded then
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Detailed Examples</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-slate-300 pl-4 py-2">
            <p className="text-slate-700 mb-2 font-semibold">Past → Present</p>
            <p className="text-slate-600 italic mb-2">
              "If the food industry had promoted healthier products earlier, obesity rates would be lower today."
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">If-clause:</span> Past Perfect (had promoted) = past condition<br/>
              <span className="font-semibold">Main clause:</span> would be = present result ("today")<br/>
              <span className="font-semibold">Logic:</span> If they had (yesterday) → it would be (now)
            </p>
          </div>

          <div className="border-l-4 border-slate-300 pl-4 py-2">
            <p className="text-slate-700 mb-2 font-semibold">Present → Past</p>
            <p className="text-slate-600 italic mb-2">
              "If people were more informed now, they would have made better decisions years ago."
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">If-clause:</span> Past Simple (were) = hypothetical present condition<br/>
              <span className="font-semibold">Main clause:</span> would have made = past result ("years ago")<br/>
              <span className="font-semibold">Logic:</span> If they were (now) → they would have been (then)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Identification Strategy</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">1</span>
            <span className="text-slate-700">Look for keywords: <strong>today, now, currently</strong> indicate a present result</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">2</span>
            <span className="text-slate-700">Look for keywords: <strong>years ago, in the past, earlier</strong> indicate a past result</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">3</span>
            <span className="text-slate-700">Observe the tense of the result, not the condition</span>
          </li>
          <li className="flex gap-3">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-center text-sm font-bold flex-shrink-0 flex items-center justify-center">4</span>
            <span className="text-slate-700">If present: use <strong>would + verb</strong>. If past: use <strong>would have + participle</strong></span>
          </li>
        </ul>
      </section>

      <div className="bg-slate-100 rounded-lg p-6 mt-8">
        <p className="text-slate-700 text-sm">
          <span className="font-semibold">Tip:</span> Master these Mixed Conditionals because they are frequently used 
          in texts about social problems and cause-effect analysis that MINEDU uses in assessments.
        </p>
      </div>
    </div>
  )
}

function Practice16() {
  const [laboratorySectionIndex, setLaboratorySectionIndex] = useState(0)
  const [dialogueAnswers, setDialogueAnswers] = useState<Record<number, string>>({})
  const [dialogueSubmitted, setDialogueSubmitted] = useState<Record<number, boolean>>({})
  const [multipleAnswers, setMultipleAnswers] = useState<Record<number, Set<string>>>(
    Object.fromEntries([1, 2, 3, 4].map(i => [i, new Set<string>()]))
  )
  const [multipleSubmitted, setMultipleSubmitted] = useState<Record<number, boolean>>({})
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<number, string>>({})
  const [sentenceSubmitted, setSentenceSubmitted] = useState<Record<number, boolean>>({})

  const sections = [
    {
      id: 'dialogues',
      title: 'Dialogues - Fill in the Blanks',
      description: 'Complete the dialogues with the correct conditional forms'
    },
    {
      id: 'multiple-choice',
      title: 'Multiple Choice',
      description: 'Choose the correct options to complete the sentences'
    },
    {
      id: 'exercises',
      title: 'Complete Exercises',
      description: 'Fill in the blanks with the correct conditional forms'
    }
  ]

  const dialogueExercises = [
    {
      number: 1,
      speaker: 'CLAIRE',
      text: 'I could have got a better mark provided I',
      blanks: [
        {
          id: 1,
          verb: '(work)',
          options: ['had worked', 'have worked', 'would work', 'works'],
          correct: 'had worked',
          hint: 'Third Conditional with "provided"'
        }
      ]
    },
    {
      number: 2,
      speaker: 'ANN',
      text: 'but I',
      blanks: [
        {
          id: 2,
          verb: '(fail)',
          options: ['would have failed', 'would fail', 'had failed', 'have failed'],
          correct: 'would have failed',
          hint: 'Third Conditional with "even if"'
        }
      ]
    },
    {
      number: 3,
      speaker: 'CLAIRE',
      text: 'Nobody fails an exam as long as they',
      blanks: [
        {
          id: 3,
          verb: '(study)',
          options: ['study', 'studied', 'have studied', 'studies'],
          correct: 'study',
          hint: 'Zero Conditional with "as long as"'
        }
      ]
    },
    {
      number: 4,
      speaker: 'ANN',
      text: 'If you',
      blanks: [
        {
          id: 4,
          verb: '(be)',
          options: ['were', 'are', 'would be', 'had been'],
          correct: 'were',
          hint: 'Second Conditional'
        }
      ]
    },
    {
      number: 5,
      speaker: 'CLAIRE',
      text: 'I wouldn\'t be where I am today if I',
      blanks: [
        {
          id: 5,
          verb: '(not work)',
          options: ['hadn\'t worked', 'haven\'t worked', 'wouldn\'t work', 'don\'t work'],
          correct: 'hadn\'t worked',
          hint: 'Mixed Conditional'
        }
      ]
    },
    {
      number: 6,
      speaker: 'SON',
      text: 'Can I go out on condition I',
      blanks: [
        {
          id: 6,
          verb: '(do)',
          options: ['do', 'did', 'have done', 'would do'],
          correct: 'do',
          hint: 'First Conditional'
        }
      ]
    },
    {
      number: 7,
      speaker: 'MOTHER',
      text: 'Well, if you',
      blanks: [
        {
          id: 7,
          verb: '(do)',
          options: ['had done', 'do', 'would do', 'have done'],
          correct: 'had done',
          hint: 'Mixed Conditional'
        }
      ]
    },
    {
      number: 8,
      speaker: 'SON',
      text: 'If I had heard you, I',
      blanks: [
        {
          id: 8,
          verb: '(do)',
          options: ['would have done', 'would do', 'will do', 'have done'],
          correct: 'would have done',
          hint: 'Third Conditional'
        }
      ]
    },
    {
      number: 9,
      speaker: 'MOTHER',
      text: 'It',
      blanks: [
        {
          id: 9,
          verb: '(not hurt)',
          options: ['would not hurt', 'will not hurt', 'would have hurt', 'does not hurt'],
          correct: 'would not hurt',
          hint: 'Second Conditional'
        }
      ]
    },
    {
      number: 10,
      speaker: 'MOTHER',
      text: 'If you',
      blanks: [
        {
          id: 10,
          verb: '(do)',
          options: ['did', 'do', 'have done', 'would do'],
          correct: 'did',
          hint: 'Second Conditional'
        }
      ]
    }
  ]

  const handleDialogueAnswer = (blankId: number, answer: string) => {
    setDialogueAnswers({ ...dialogueAnswers, [blankId]: answer })
    setDialogueSubmitted({ ...dialogueSubmitted, [blankId]: true })
  }

  const isDialogueCorrect = (blankId: number) => {
    const blank = dialogueExercises.flatMap(e => e.blanks).find(b => b.id === blankId)
    return blank?.correct === dialogueAnswers[blankId]
  }

  const toggleMultipleAnswer = (qId: number, option: string) => {
    const current = multipleAnswers[qId] || new Set()
    const newSet = new Set(current)
    if (newSet.has(option)) {
      newSet.delete(option)
    } else {
      newSet.add(option)
    }
    setMultipleAnswers({ ...multipleAnswers, [qId]: newSet })
  }

  const submitMultipleChoice = (qId: number) => {
    setMultipleSubmitted({ ...multipleSubmitted, [qId]: true })
  }

  const handleSentenceAnswer = (sId: number, answer: string) => {
    setSentenceAnswers({ ...sentenceAnswers, [sId]: answer })
    setSentenceSubmitted({ ...sentenceSubmitted, [sId]: true })
  }

  const multipleChoiceQuestions = [
    {
      id: 1,
      text: 'If I were you, I ______ anything',
      correctAnswers: ['B', 'D'],
      options: [
        { letter: 'A', text: 'hadn\'t said' },
        { letter: 'B', text: 'wouldn\'t say' },
        { letter: 'C', text: 'wouldn\'t be said' },
        { letter: 'D', text: 'wouldn\'t have said' }
      ]
    },
    {
      id: 2,
      text: 'If I\'d known, I ______ you',
      correctAnswers: ['A', 'D'],
      options: [
        { letter: 'A', text: 'might have helped' },
        { letter: 'B', text: 'would help' },
        { letter: 'C', text: 'might help' },
        { letter: 'D', text: 'would have helped' }
      ]
    },
    {
      id: 3,
      text: 'If we had planned this better, we ______ in so much trouble now',
      correctAnswers: ['C'],
      options: [
        { letter: 'A', text: 'wouldn\'t have been' },
        { letter: 'B', text: 'hadn\'t been' },
        { letter: 'C', text: 'wouldn\'t be' },
        { letter: 'D', text: 'weren\'t' }
      ]
    },
    {
      id: 4,
      text: '______ your job, you will need enough money',
      correctAnswers: ['A', 'C'],
      options: [
        { letter: 'A', text: 'If you lose' },
        { letter: 'B', text: 'Whether you lose' },
        { letter: 'C', text: 'Should you lose' },
        { letter: 'D', text: 'Had you lose' }
      ]
    }
  ]

  const sentenceExercises = [
    {
      id: 1,
      text: 'Would you know what to do if you',
      verb: '(have)',
      blank: 'were having',
      hint: 'Second Conditional'
    },
    {
      id: 2,
      text: 'If it hadn\'t been for you, I',
      verb: '(be)',
      blank: 'wouldn\'t be',
      hint: 'Mixed Conditional'
    },
    {
      id: 3,
      text: 'As long as she',
      verb: '(need)',
      blank: 'needs',
      hint: 'Zero Conditional'
    },
    {
      id: 4,
      text: 'I wouldn\'t be living here if I',
      verb: '(have)',
      blank: 'had',
      hint: 'Second Conditional'
    },
    {
      id: 5,
      text: 'If there hadn\'t been a fire extinguisher, the house',
      verb: '(burn)',
      blank: 'would have burned',
      hint: 'Third Conditional'
    },
    {
      id: 6,
      text: 'You',
      verb: '(can)',
      blank: 'cannot',
      hint: 'Zero Conditional with "unless"'
    },
    {
      id: 7,
      text: '______ happier if you had never met her?',
      verb: '',
      blank: 'Would you have been',
      hint: 'Third Conditional'
    },
    {
      id: 8,
      text: 'If I',
      verb: '(meet)',
      blank: 'hadn\'t met',
      hint: 'Mixed Conditional'
    },
    {
      id: 9,
      text: 'I',
      verb: '(go)',
      blank: '\'m going to pass',
      hint: 'First Conditional'
    },
    {
      id: 10,
      text: 'They might have spent the whole week at the campsite, provided they',
      verb: '(bring)',
      blank: 'had brought',
      hint: 'Third Conditional'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Conditional Structures - Complete Exercises</h2>
        <p className="text-purple-100">
          Practice all types of conditionals: Zero, First, Second, Third, and Mixed through dialogs and exercises
        </p>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-2 border-b-2 border-gray-300 flex-wrap">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setLaboratorySectionIndex(idx)}
            className={`px-4 py-3 font-semibold text-sm border-b-2 transition ${
              laboratorySectionIndex === idx
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {laboratorySectionIndex === 0 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Dialogues - Fill in Blanks Exercise</h2>
            <p className="text-slate-600">Complete each dialogue by selecting the correct conditional form</p>
          </div>

          {dialogueExercises.map((exercise) => (
            <div key={exercise.number} className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Blank {exercise.number}</h3>
              <p className="text-slate-700 mb-4">
                <span className="font-semibold text-purple-600">{exercise.speaker}:</span> {exercise.text}
                {exercise.blanks[0] && (
                  <>
                    <span className="font-bold text-blue-600"> [_____] </span>
                    {exercise.blanks[0].verb}
                  </>
                )}
              </p>
              
              {exercise.blanks[0] && (
                <div className="space-y-2 mb-4">
                  {exercise.blanks[0].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleDialogueAnswer(exercise.blanks[0].id, option)}
                      disabled={dialogueSubmitted[exercise.blanks[0].id]}
                      className={`w-full p-3 rounded border-2 text-left transition ${
                        dialogueAnswers[exercise.blanks[0].id] === option
                          ? dialogueSubmitted[exercise.blanks[0].id]
                            ? isDialogueCorrect(exercise.blanks[0].id)
                              ? 'border-green-600 bg-green-50'
                              : 'border-red-600 bg-red-50'
                            : 'border-purple-600 bg-purple-50'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <span className="font-mono font-semibold">{option}</span>
                      {dialogueSubmitted[exercise.blanks[0].id] && dialogueAnswers[exercise.blanks[0].id] === option && isDialogueCorrect(exercise.blanks[0].id) && (
                        <span className="ml-2 text-green-600 font-bold">✓ Correct!</span>
                      )}
                      {dialogueSubmitted[exercise.blanks[0].id] && dialogueAnswers[exercise.blanks[0].id] === option && !isDialogueCorrect(exercise.blanks[0].id) && (
                        <span className="ml-2 text-red-600 font-bold">✗ Incorrect</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {dialogueSubmitted[exercise.blanks[0].id] && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Hint:</span> {exercise.blanks[0].hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {laboratorySectionIndex === 1 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Multiple Choice Exercise</h2>
            <p className="text-slate-600">Select all correct options for each sentence</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 space-y-8">
            {multipleChoiceQuestions.map((q) => (
              <div key={q.id} className="pb-6 border-b last:border-b-0">
                <p className="font-semibold text-slate-900 mb-4">{q.id}. {q.text}</p>
                <div className="space-y-2 mb-4">
                  {q.options.map((option) => (
                    <button
                      key={option.letter}
                      onClick={() => !multipleSubmitted[q.id] && toggleMultipleAnswer(q.id, option.letter)}
                      disabled={multipleSubmitted[q.id]}
                      className={`w-full p-3 rounded border-2 text-left transition flex items-center gap-2 ${
                        (multipleAnswers[q.id] || new Set()).has(option.letter)
                          ? multipleSubmitted[q.id]
                            ? q.correctAnswers.includes(option.letter)
                              ? 'border-green-600 bg-green-50'
                              : 'border-red-600 bg-red-50'
                            : 'border-purple-600 bg-purple-50'
                          : multipleSubmitted[q.id] && q.correctAnswers.includes(option.letter)
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={(multipleAnswers[q.id] || new Set()).has(option.letter)}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="font-bold">{option.letter}.</span>
                      <span className="text-slate-700">{option.text}</span>
                      {multipleSubmitted[q.id] && (multipleAnswers[q.id] || new Set()).has(option.letter) && q.correctAnswers.includes(option.letter) && (
                        <span className="ml-auto text-green-600 font-bold">✓</span>
                      )}
                      {multipleSubmitted[q.id] && (multipleAnswers[q.id] || new Set()).has(option.letter) && !q.correctAnswers.includes(option.letter) && (
                        <span className="ml-auto text-red-600 font-bold">✗</span>
                      )}
                      {multipleSubmitted[q.id] && !(multipleAnswers[q.id] || new Set()).has(option.letter) && q.correctAnswers.includes(option.letter) && (
                        <span className="ml-auto text-green-600 font-bold">✓ Correct</span>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => submitMultipleChoice(q.id)}
                  disabled={multipleSubmitted[q.id] || (multipleAnswers[q.id] || new Set()).size === 0}
                  className="px-4 py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 disabled:bg-gray-300"
                >
                  {multipleSubmitted[q.id] ? 'Submitted ✓' : 'Submit Answer'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {laboratorySectionIndex === 2 && (
        <div className="space-y-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Complete Sentences Exercise</h2>
            <p className="text-slate-600">Type or select the correct conditional form to complete each sentence</p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 space-y-6">
            {sentenceExercises.map((exercise) => (
              <div key={exercise.id} className="pb-6 border-b last:border-b-0">
                <p className="font-semibold text-slate-900 mb-4">
                  {exercise.id}. {exercise.text} <span className="font-bold text-blue-600">[_____]</span> {exercise.verb}
                </p>
                <input
                  type="text"
                  value={sentenceAnswers[exercise.id] || ''}
                  onChange={(e) => !sentenceSubmitted[exercise.id] && setSentenceAnswers({ ...sentenceAnswers, [exercise.id]: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !sentenceSubmitted[exercise.id]) {
                      handleSentenceAnswer(exercise.id, sentenceAnswers[exercise.id] || '')
                    }
                  }}
                  disabled={sentenceSubmitted[exercise.id]}
                  placeholder="Type your answer..."
                  className="w-full p-3 border-2 border-gray-300 rounded mb-3 disabled:bg-gray-50"
                />
                <button
                  onClick={() => handleSentenceAnswer(exercise.id, sentenceAnswers[exercise.id] || '')}
                  disabled={sentenceSubmitted[exercise.id] || !sentenceAnswers[exercise.id]}
                  className="px-4 py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 disabled:bg-gray-300 mr-2"
                >
                  {sentenceSubmitted[exercise.id] ? 'Checked ✓' : 'Check Answer'}
                </button>
                {sentenceSubmitted[exercise.id] && (
                  <div className={`mt-3 p-3 rounded border-l-4 ${
                    sentenceAnswers[exercise.id]?.toLowerCase() === exercise.blank.toLowerCase()
                      ? 'bg-green-50 border-green-600'
                      : 'bg-red-50 border-red-600'
                  }`}>
                    {sentenceAnswers[exercise.id]?.toLowerCase() === exercise.blank.toLowerCase() ? (
                      <>
                        <p className="text-green-700 font-semibold">✓ Correct!</p>
                      </>
                    ) : (
                      <>
                        <p className="text-red-700 font-semibold">✗ Incorrect</p>
                        <p className="text-red-600 text-sm mt-1">Correct answer: <span className="font-mono font-bold">{exercise.blank}</span></p>
                      </>
                    )}
                    <p className="text-slate-600 text-sm mt-2">Hint: {exercise.hint}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Reading16() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({})

  const comprehensionQuestions = [
    {
      id: 1,
      question: "What was Sarah's initial dream?",
      options: [
        { letter: 'A', text: 'To become a teacher' },
        { letter: 'B', text: 'To become a writer', isCorrect: true },
        { letter: 'C', text: 'To become a publisher' },
        { letter: 'D', text: 'To become a reader' }
      ]
    },
    {
      id: 2,
      question: "What event changed Sarah's perspective?",
      options: [
        { letter: 'A', text: 'She got rejected by a publisher' },
        { letter: 'B', text: 'Her teacher assigned a writing project', isCorrect: true },
        { letter: 'C', text: 'She won an award' },
        { letter: 'D', text: 'She read a famous book' }
      ]
    },
    {
      id: 3,
      question: "How many times was Sarah's book rejected before acceptance?",
      options: [
        { letter: 'A', text: 'None' },
        { letter: 'B', text: 'Once' },
        { letter: 'C', text: 'A few times', isCorrect: true },
        { letter: 'D', text: 'Many times' }
      ]
    },
    {
      id: 4,
      question: "What two factors does Sarah credit to her success?",
      options: [
        { letter: 'A', text: 'Talent and luck' },
        { letter: 'B', text: 'Reading and writing' },
        { letter: 'C', text: 'Persistence and dedication', isCorrect: true },
        { letter: 'D', text: 'Money and time' }
      ]
    },
    {
      id: 5,
      question: "According to the text, how did reading influence Sarah's writing?",
      options: [
        { letter: 'A', text: 'It taught her grammar' },
        { letter: 'B', text: 'It developed her passion for writing', isCorrect: true },
        { letter: 'C', text: 'It showed her how to publish' },
        { letter: 'D', text: 'It connected her with a publisher' }
      ]
    }
  ]

  const grammarQuestions = [
    {
      id: 6,
      sentence: 'If she had given up after the first rejection...',
      question: 'Which conditional type is used?',
      options: [
        { letter: 'A', text: 'First Conditional' },
        { letter: 'B', text: 'Second Conditional' },
        { letter: 'C', text: 'Third Conditional', isCorrect: true },
        { letter: 'D', text: 'Mixed Conditional' }
      ]
    },
    {
      id: 7,
      sentence: 'If she is invited to participate in a book fair...',
      question: 'Which conditional type is used?',
      options: [
        { letter: 'A', text: 'First Conditional', isCorrect: true },
        { letter: 'B', text: 'Second Conditional' },
        { letter: 'C', text: 'Third Conditional' },
        { letter: 'D', text: 'Zero Conditional' }
      ]
    },
    {
      id: 8,
      sentence: 'If she hadn\'t spent her free time reading...',
      question: 'This is an example of which type?',
      options: [
        { letter: 'A', text: 'Third Conditional only' },
        { letter: 'B', text: 'Mixed Conditional (past condition, present consequence)', isCorrect: true },
        { letter: 'C', text: 'Second Conditional' },
        { letter: 'D', text: 'First Conditional' }
      ]
    },
    {
      id: 9,
      sentence: 'If she set aside a little bit of time every day...',
      question: 'Which conditional type is used?',
      options: [
        { letter: 'A', text: 'Zero Conditional' },
        { letter: 'B', text: 'First Conditional', isCorrect: true },
        { letter: 'C', text: 'Second Conditional' },
        { letter: 'D', text: 'Third Conditional' }
      ]
    },
    {
      id: 10,
      sentence: 'If she had not believed in herself and her work...',
      question: 'What does this conditional express?',
      options: [
        { letter: 'A', text: 'A real present situation' },
        { letter: 'B', text: 'A possible future event' },
        { letter: 'C', text: 'A past hypothetical that didn\'t happen', isCorrect: true },
        { letter: 'D', text: 'A present hypothetical situation' }
      ]
    }
  ]

  const handleAnswerSelect = (qId: number, option: string) => {
    setAnswers({ ...answers, [qId]: option })
    setSubmitted({ ...submitted, [qId]: true })
  }

  const isCorrect = (qId: number) => {
    const allQuestions = [...comprehensionQuestions, ...grammarQuestions]
    const question = allQuestions.find(q => q.id === qId)
    if (!question) return false
    const selectedOption = question.options.find(opt => opt.letter === answers[qId])
    return selectedOption?.isCorrect || false
  }

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Sarah's Path to Success</h3>
        <div className="text-slate-800 leading-relaxed space-y-4 text-lg">
          <p>
            Once upon a time, there was a young girl named Sarah. She was an avid reader and loved nothing more than 
            getting lost in the pages of a book. She dreamed of becoming a writer one day, but she didn't think it was possible. 
            She often thought to herself, "If only I had the time to write a book, then I could become a writer."
          </p>
          <p>
            But one day, Sarah's teacher assigned a writing project for the class and it was then when she realized that if she 
            set aside a little bit of time every day to work on her writing, she could turn her dream into reality. So she began 
            to write every day after school for a short period of time. She wrote about her adventures, her friends, and her family.
          </p>
          <p>
            And as she wrote, her stories started to take shape, and before she knew it, she had written an entire novel. 
            She showed it to her teacher, who was impressed with her work and encouraged her to submit it to a publisher. 
            If she hadn't had that teacher that gave her an assignment, she would have never started writing.
          </p>
          <p>
            After a few rejections, one publisher finally accepted her book, and soon it was being read by people all over the world. 
            Sarah realized that the key to achieving her dreams was persistence and dedication. If she had given up after the first rejection, 
            she would have never become a published author. But because she kept going, she was able to make her dream a reality.
          </p>
          <p>
            From that day on she wrote many books, and became a well-known author, who now has her own readers and fans. 
            If she had not believed in herself and her work, she would never have reached that level of success. 
            But also, if she hadn't spent her free time reading, she wouldn't have developed the passion for writing. 
            And if the publisher had not taken a chance on an unknown author like her, her book would have never been published.
          </p>
          <p>
            Now, if she is invited to participate in a book fair, she will certainly go. When she receives a good review, 
            she will be very happy. If she sells out all her books, she will consider writing a new one. And if she wins an award, 
            she will be over the moon!
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Part 1: Comprehension Questions</h3>
        <p className="text-slate-600 mb-6">Select the correct answer for each question</p>
        <div className="space-y-8">
          {comprehensionQuestions.map((q) => (
            <div key={q.id} className="border-l-4 border-blue-600 pl-4 py-4 bg-blue-50 rounded p-4">
              <p className="font-semibold text-slate-900 mb-4">{q.id}. {q.question}</p>
              <div className="space-y-3 mb-4">
                {q.options.map((option) => (
                  <button
                    key={option.letter}
                    onClick={() => handleAnswerSelect(q.id, option.letter)}
                    disabled={submitted[q.id]}
                    className={`w-full text-left p-3 rounded border-2 transition ${
                      answers[q.id] === option.letter
                        ? submitted[q.id]
                          ? isCorrect(q.id)
                            ? 'border-green-600 bg-green-50'
                            : 'border-red-600 bg-red-50'
                          : 'border-blue-600 bg-blue-100'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    } ${submitted[q.id] && option.isCorrect && answers[q.id] !== option.letter ? 'border-green-600 bg-green-50' : ''}`}
                  >
                    <span className="font-semibold">{option.letter}.</span> {option.text}
                    {submitted[q.id] && answers[q.id] === option.letter && isCorrect(q.id) && (
                      <span className="ml-2 text-green-600 font-bold">✓ Correct!</span>
                    )}
                    {submitted[q.id] && answers[q.id] === option.letter && !isCorrect(q.id) && (
                      <span className="ml-2 text-red-600 font-bold">✗ Incorrect</span>
                    )}
                    {submitted[q.id] && option.isCorrect && answers[q.id] !== option.letter && (
                      <span className="ml-2 text-green-600 font-bold">✓ Correct Answer</span>
                    )}
                  </button>
                ))}
              </div>
              {!submitted[q.id] && (
                <p className="text-sm text-gray-500 italic">Click an option to submit your answer</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Part 2: Grammar Focus - Identify Conditional Types</h3>
        <p className="text-slate-600 mb-6">Select the correct conditional type for each sentence</p>
        <div className="space-y-8">
          {grammarQuestions.map((q) => (
            <div key={q.id} className="border-l-4 border-green-600 pl-4 py-4 bg-green-50 rounded p-4">
              <p className="font-mono text-sm text-gray-600 italic mb-2">"{q.sentence}"</p>
              <p className="font-semibold text-slate-900 mb-4">{q.id}. {q.question}</p>
              <div className="space-y-3 mb-4">
                {q.options.map((option) => (
                  <button
                    key={option.letter}
                    onClick={() => handleAnswerSelect(q.id, option.letter)}
                    disabled={submitted[q.id]}
                    className={`w-full text-left p-3 rounded border-2 transition ${
                      answers[q.id] === option.letter
                        ? submitted[q.id]
                          ? isCorrect(q.id)
                            ? 'border-green-600 bg-green-50'
                            : 'border-red-600 bg-red-50'
                          : 'border-green-600 bg-green-100'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    } ${submitted[q.id] && option.isCorrect && answers[q.id] !== option.letter ? 'border-green-600 bg-green-50' : ''}`}
                  >
                    <span className="font-semibold">{option.letter}.</span> {option.text}
                    {submitted[q.id] && answers[q.id] === option.letter && isCorrect(q.id) && (
                      <span className="ml-2 text-green-600 font-bold">✓ Correct!</span>
                    )}
                    {submitted[q.id] && answers[q.id] === option.letter && !isCorrect(q.id) && (
                      <span className="ml-2 text-red-600 font-bold">✗ Incorrect</span>
                    )}
                    {submitted[q.id] && option.isCorrect && answers[q.id] !== option.letter && (
                      <span className="ml-2 text-green-600 font-bold">✓ Correct Answer</span>
                    )}
                  </button>
                ))}
              </div>
              {!submitted[q.id] && (
                <p className="text-sm text-gray-500 italic">Click an option to submit your answer</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Listening16() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Interactive Listening Comprehension</h2>
        <p className="text-green-100">
          Listen to the audio examples and answer questions about Mixed Conditionals in context. 
          You can replay as many times as needed!
        </p>
      </div>

      {/* Audio Activity 1 */}
      <AudioInteractiveActivity
        number={1}
        audioUrl="/audio/conditional-1.mp3"
        question="What does the speaker say about the past decision?"
        options={[
          { id: 'A', label: 'A', text: 'If they had invested earlier, the results would be better today' },
          { id: 'B', label: 'B', text: 'If they invest now, the results will be better in the future' },
          { id: 'C', label: 'C', text: 'They invested but the results are still bad' }
        ]}
        correctAnswer="A"
        explanation="The audio uses Past→Present: 'If they had invested earlier, the results would be better today.' Notice how a past decision connects with today's reality."
        baseXP={25}
      />

      {/* Audio Activity 2 */}
      <AudioInteractiveActivity
        number={2}
        audioUrl="/audio/conditional-2.mp3"
        question="Which Mixed Conditional structure is used?"
        options={[
          { id: 'A', label: 'A', text: 'Past→Present (If + Past Perfect, would + verb)' },
          { id: 'B', label: 'B', text: 'Present→Past (If + Past Simple, would have + past participle)' },
          { id: 'C', label: 'C', text: 'Third Conditional (all in the past)' }
        ]}
        correctAnswer="B"
        explanation="The audio uses Present→Past: 'If you were more informed now, you would have made better decisions yesterday.' The condition is present (hypothetical) but the result is past."
        baseXP={25}
      />

      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-green-900 mb-2">Listening Tips</h3>
        <ul className="text-green-800 space-y-2 text-sm">
          <li>• Listen 1-2 times without pressure</li>
          <li>• Identify keyword time markers (today, now, ago, years ago)</li>
          <li>• Notice the verb tense pattern</li>
          <li>• Replay if you're uncertain</li>
          <li>• Bonus: Earn extra XP if you get it right with 2 or fewer replays</li>
        </ul>
      </div>
    </div>
  )
}

function ExamPrep16() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Exam Preparation: Mixed Conditionals</h2>
        <p className="text-orange-100">
          Master the key strategies and pro-tips for identifying and using conditionals in MINEDU exams
        </p>
      </div>

      {/* Pro-tip Highlight */}
      <div className="bg-yellow-50 border-4 border-yellow-400 rounded-lg p-6 mb-8">
        <div className="flex gap-4">
          <div className="text-lg font-bold">PRO-TIP</div>
          <div>
            <h3 className="text-lg font-bold text-yellow-900 mb-3">Pro-tip for the Exam</h3>
            <p className="text-yellow-900 font-semibold text-lg leading-relaxed">
              In English specialization exams, <span className="underline">"Conditionals" are almost always linked to the function of 
              "Hypothesizing and Speculating"</span> (Second and Third conditional) or "Giving Advice".
            </p>
            <p className="text-yellow-800 mt-3 text-sm">
              When you see a conditional in an exam question, ask yourself: Is this speaker hypothesizing/speculating about something? 
              Or are they giving advice? This will help you identify the correct language function.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Question Example */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Direct Question on Conditionals - Language Function</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4 rounded">
          <p className="font-semibold text-blue-900 mb-2">Fragment:</p>
          <p className="text-blue-800 italic mb-3">
            <span className="font-semibold">Interviewer:</span> "If you had to choose between movies or theater, which one would you choose?"
          </p>
          <p className="text-blue-800">
            <span className="font-semibold">Stephanie:</span> "That's a very difficult question! I guess, if I had to choose one, it would be theater."
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-4">
          <p className="font-semibold text-green-900 mb-3">Which of the following language functions is used in the fragment above?</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">a)</span>
              <span className="text-slate-700">Expressing preferences.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">b)</span>
              <span className="text-slate-700">Asking for and giving advice.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">c)</span>
              <span className="text-slate-700 font-semibold">Hypothesizing and speculating.</span> ✓ <span className="text-green-600 font-bold">CORRECT</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
          <p className="font-semibold text-purple-900 mb-2">Explanation:</p>
          <p className="text-purple-800 text-sm">
            The speaker uses "If I had to choose one..." which is a Second Conditional expressing a hypothetical situation. 
            This is speculating about an alternative scenario. In both the question and answer, the conditional expresses 
            "hypothesizing and speculating" rather than giving actual advice or just expressing a preference.
          </p>
        </div>
      </div>

      {/* Key Strategies */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Key Exam Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-3">1. Identify Time Markers</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• "Today," "now," "currently" = Present or Past→Present</li>
              <li>• "Years ago," "in the past," "earlier" = Past or Hypothetical</li>
              <li>• "Will," "tomorrow" = Future or First Conditional</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-900 mb-3">2. Match Verb Tenses</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• If + Past Perfect = Past condition</li>
              <li>• If + Past Simple = Hypothetical present</li>
              <li>• If + Present = Real/likely future</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-orange-900 mb-3">3. Language Functions</h4>
            <ul className="text-orange-800 text-sm space-y-1">
              <li>• Second/Third = Hypothesizing</li>
              <li>• Should + infinitive = Giving advice</li>
              <li>• Mixed = Complex reasoning</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-3">4. Common Exam Patterns</h4>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Multiple choice verb options</li>
              <li>• Fill in blanks exercises</li>
              <li>• Function or intent questions</li>
              <li>• Error identification tasks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Tip */}
      <div className="bg-slate-100 rounded-lg p-6 mt-8 border-2 border-slate-300">
        <p className="text-slate-800">
          <span className="font-bold text-lg">Remember:</span> The key to mastering conditionals in exams is understanding 
          the TIME relationship between the condition and the result. Always ask: "When does the condition happen? When does 
          the result happen?" Once you answer these questions, the correct verb forms will become obvious.
        </p>
      </div>
    </div>
  )
}
