import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { TicketBought } from "../generated/schema"
import { TicketBought as TicketBoughtEvent } from "../generated/ProxyEvents/ProxyEvents"
import { handleTicketBought } from "../src/proxy-events"
import { createTicketBoughtEvent } from "./proxy-events-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _contractEvent = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _ticketId = BigInt.fromI32(234)
    let newTicketBoughtEvent = createTicketBoughtEvent(
      _contractEvent,
      _ticketId
    )
    handleTicketBought(newTicketBoughtEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("TicketBought created and stored", () => {
    assert.entityCount("TicketBought", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TicketBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_contractEvent",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "TicketBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_ticketId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
