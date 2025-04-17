import { BlackjackGame } from "../BlackjackGame.js"
import { Deck } from "../Deck.js"
import { Hand } from "../Hand.js"

jest.mock("../Deck.js")
jest.mock("../Hand.js")

describe("BlackjackGame", () => {
  let game

  beforeEach(() => {
    Deck.mockClear()
    Hand.mockClear()

    game = new BlackjackGame()
  })

  test("constructor initializes the game state correctly", () => {
    expect(game.dealerHand).toBeInstanceOf(Hand)
    expect(game.playerHand).toBeInstanceOf(Hand)
    expect(game.deck).toBeInstanceOf(Deck)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.playerTotal).toBe(0)
    expect(game.isPlaying).toBe(false)
  })

  test("resetState resets the game state", () => {
    game.resetState()
    expect(game.isPlaying).toBe(true)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.playerTotal).toBe(0)
    expect(game.dealerHand).toBeInstanceOf(Hand)
    expect(game.playerHand).toBeInstanceOf(Hand)
    expect(game.deck.shuffle).toHaveBeenCalled()
  })

  test("handleAce adjusts hand value correctly", () => {
    const result = game.subtractAceWhenBust(22, 1)
    expect(result).toBe(12) // Ace adjusted from 11 to 1
  })
})
