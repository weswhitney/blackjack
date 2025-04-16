import { BlackjackGame } from "../Blackjack.js"
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
    expect(game.yourHand).toBeInstanceOf(Hand)
    expect(game.deck).toBeInstanceOf(Deck)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.yourTotal).toBe(0)
    expect(game.isPlaying).toBe(false)
  })

  test("resetState resets the game state", () => {
    game.resetState()
    expect(game.isPlaying).toBe(true)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.yourTotal).toBe(0)
    expect(game.dealerHand).toBeInstanceOf(Hand)
    expect(game.yourHand).toBeInstanceOf(Hand)
    expect(game.deck.shuffle).toHaveBeenCalled()
  })

  test("hit adds a card to the player's hand and checks for bust", () => {
    const mockCard = "J-S"
    game.deck.deal.mockReturnValue(mockCard)
    game.yourHand.getValue.mockReturnValue(22)
    game.yourHand.aceCount.mockReturnValue(0)

    game.hit()

    expect(game.yourHand.addCard).toHaveBeenCalledWith(mockCard)
    expect(game.canHit).toBe(false) // Player busts
  })

  test("stand calculates totals and determines the winner", () => {
    game.dealerHand.getValue.mockReturnValue(18)
    game.dealerHand.aceCount.mockReturnValue(0)
    game.yourHand.getValue.mockReturnValue(20)
    game.yourHand.aceCount.mockReturnValue(0)

    game.stand()

    expect(game.dealerTotal).toBe(18)
    expect(game.yourTotal).toBe(20)
    expect(game.message).toBe("Player Wins!")
    expect(game.showHoleCard).toBe(true)
    expect(game.canHit).toBe(false)
  })

  test("handleAce adjusts hand value correctly", () => {
    const result = game.handleAce(22, 1)
    expect(result).toBe(12) // Ace adjusted from 11 to 1
  })
})
