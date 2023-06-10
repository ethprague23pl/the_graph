import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { TicketBought } from "../generated/ProxyEvents/ProxyEvents"

export function createTicketBoughtEvent(
  _contractEvent: Address,
  _ticketId: BigInt
): TicketBought {
  let ticketBoughtEvent = changetype<TicketBought>(newMockEvent())

  ticketBoughtEvent.parameters = new Array()

  ticketBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "_contractEvent",
      ethereum.Value.fromAddress(_contractEvent)
    )
  )
  ticketBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "_ticketId",
      ethereum.Value.fromUnsignedBigInt(_ticketId)
    )
  )

  return ticketBoughtEvent
}
