import { TicketBought as TicketBoughtEvent } from "../generated/ProxyEvents/ProxyEvents"
import { TicketBought } from "../generated/schema"

export function handleTicketBought(event: TicketBoughtEvent): void {
  let entity = new TicketBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._contractEvent = event.params._contractEvent
  entity._ticketId = event.params._ticketId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
