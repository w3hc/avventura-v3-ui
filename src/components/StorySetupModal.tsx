'use client'

import React, { useState } from 'react'
import { Box, SimpleGrid, CloseButton, HStack } from '@chakra-ui/react'
import { Dialog, Portal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NumberInput } from '@/components/ui/number-input'
import { Field } from '@/components/ui/field'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslations } from '@/translations'
import { Language, SUPPORTED_LANGUAGES } from '@/utils/i18n'
import { toaster } from '@/components/ui/toaster'
import { brandColors } from '@/theme'

export type Difficulty = 'easy' | 'hard' | 'super-hard'
export type GameMode = 'solo' | 'family' | 'multi' | 'web3'

export interface Player {
  name: string
  info: string
}

export interface StorySetupData {
  players: Player[]
  duration: number
  difficulty: Difficulty
  language: Language
  mode: GameMode
}

interface StorySetupModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StorySetupData) => void
}

const emptyPlayer = (): Player => ({ name: '', info: '' })

const StorySetupModal: React.FC<StorySetupModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { language } = useLanguage()

  const [players, setPlayers] = useState<Player[]>([emptyPlayer()])
  const [duration, setDuration] = useState('20')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language)
  const [mode, setMode] = useState<GameMode>('family')

  const t = useTranslations(selectedLanguage)

  const resetFields = () => {
    setPlayers([emptyPlayer()])
    setDuration('20')
    setDifficulty('easy')
    setSelectedLanguage(language)
    setMode('family')
  }

  const resetAndClose = () => {
    resetFields()
    onClose()
  }

  const addPlayer = () => {
    setPlayers(prev => [...prev, emptyPlayer()])
  }

  const removePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index))
  }

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    setPlayers(prev =>
      prev.map((player, i) => (i === index ? { ...player, [field]: value } : player))
    )
  }

  const handleSubmit = () => {
    const validPlayers = players
      .map(player => ({ name: player.name.trim(), info: player.info.trim() }))
      .filter(player => player.name)

    if (validPlayers.length === 0) {
      toaster.create({
        description: t.storySetup.playersRequiredError,
        type: 'warning',
        duration: 3000,
      })
      return
    }

    const durationValue = Number(duration)
    if (!duration || Number.isNaN(durationValue) || durationValue <= 0) {
      toaster.create({
        description: t.storySetup.durationRequiredError,
        type: 'warning',
        duration: 3000,
      })
      return
    }

    onSubmit({
      players: validPlayers,
      duration: durationValue,
      difficulty,
      language: selectedLanguage,
      mode,
    })

    resetFields()
  }

  const difficultyOptions: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: t.storySetup.difficultyEasy },
    { value: 'hard', label: t.storySetup.difficultyHard },
    { value: 'super-hard', label: t.storySetup.difficultySuperHard },
  ]

  const modeOptions: { value: GameMode; label: string }[] = [
    { value: 'solo', label: t.storySetup.modeSolo },
    { value: 'family', label: t.storySetup.modeFamily },
    { value: 'multi', label: t.storySetup.modeMulti },
    { value: 'web3', label: t.storySetup.modeWeb3 },
  ]

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e: { open: boolean }) => (e.open ? null : resetAndClose())}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={6}>
            <Dialog.Header>
              <Dialog.Title>{t.storySetup.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pt={4}>
              <Box display="flex" flexDirection="column" gap={5}>
                <Field label={t.storySetup.playersLabel} required>
                  <Box display="flex" flexDirection="column" gap={2} width="100%">
                    {players.map((player, index) => (
                      <HStack key={index} gap={2} width="100%" align="center">
                        <Input
                          autoFocus={index === 0}
                          placeholder={t.storySetup.playerNamePlaceholder}
                          value={player.name}
                          onChange={e => updatePlayer(index, 'name', e.target.value)}
                          flex={2}
                        />
                        <Input
                          size="sm"
                          placeholder={t.storySetup.playerInfoPlaceholder}
                          value={player.info}
                          onChange={e => updatePlayer(index, 'info', e.target.value)}
                          flex={1}
                        />
                        {players.length > 1 && (
                          <CloseButton size="sm" onClick={() => removePlayer(index)} />
                        )}
                      </HStack>
                    ))}
                    <Button size="sm" variant="outline" onClick={addPlayer} alignSelf="flex-start">
                      {t.storySetup.addPlayerButton}
                    </Button>
                  </Box>
                </Field>

                <Field label={t.storySetup.durationLabel} required>
                  <NumberInput.Root
                    value={duration}
                    onValueChange={e => setDuration(e.value)}
                    min={1}
                    width="100%"
                  >
                    <NumberInput.Field placeholder={t.storySetup.durationPlaceholder} />
                  </NumberInput.Root>
                </Field>

                <Field label={t.storySetup.difficultyLabel}>
                  <SimpleGrid columns={3} gap={2} width="100%">
                    {difficultyOptions.map(option => (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={difficulty === option.value ? 'solid' : 'outline'}
                        bg={difficulty === option.value ? brandColors.accent : undefined}
                        onClick={() => setDifficulty(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Field>

                <Field label={t.storySetup.modeLabel}>
                  <SimpleGrid columns={2} gap={2} width="100%">
                    {modeOptions.map(option => (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={mode === option.value ? 'solid' : 'outline'}
                        bg={mode === option.value ? brandColors.accent : undefined}
                        onClick={() => setMode(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Field>

                <Field label={t.storySetup.languageLabel}>
                  <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value as Language)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'var(--chakra-colors-gray-900, #171923)',
                      borderColor: 'var(--chakra-colors-gray-600, #4A5568)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: '6px',
                      color: 'white',
                    }}
                  >
                    {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Field>
              </Box>
            </Dialog.Body>

            <Dialog.Footer gap={3} pt={6}>
              <Button variant="outline" onClick={resetAndClose}>
                {t.storySetup.cancelButton}
              </Button>
              <Button colorPalette="blue" onClick={handleSubmit}>
                {t.storySetup.startButton}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default StorySetupModal
