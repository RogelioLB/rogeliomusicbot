import { Severity } from "./misc";

export type PlayerEventType = | "TrackStartEvent" | "TrackEndEvent" | "TrackExceptionEvent" | "TrackStuckEvent" | "WebSocketClosedEvent";

export type TrackEndReason = | "FINISHED" | "LOAD_FAILED" | "STOPPED" | "REPLACED" | "CLEANUP";

export type Event = | TrackStartEvent | TrackEndEvent | TrackExceptionEvent | TrackStuckEvent | WebSocketClosedEvent;

export interface PlayerUpdate {
  op: "playerUpdate";
  /**
   * The guild this player belongs to.
   */
  guildId: string;
  /**
   * Current State of the Player.
   */
  state: PlayerState;
}

export interface PlayerState {
  /**
   * Timestamp of when the player first started.
   */
  time: number;
  /**
   * The position of the current playing track.
   */
  position: number;
}

export interface PlayerEvent {
  op: "event";
  /**
   * The type of player event.
   */
  type: PlayerEventType;
}

export interface TrackStartEvent extends PlayerEvent {
  type: "TrackStartEvent";
  /**
   * The track that started playing.
   */
  track: string;
}

export interface TrackEndEvent extends PlayerEvent {
  type: "TrackEndEvent";
  /**
   * Reason the track ended.
   */
  reason: TrackEndReason;
  /**
   * The track that ended.
   */
  track: string;
}

export interface Exception {
  /**
   * Exception Severity.
   */
  severity: Severity;
  /**
   * The exception message.
   */
  message: string;
  /**
   * The cause of this exception.
   */
  cause: string;
}

export interface TrackExceptionEvent extends PlayerEvent {
  type: "TrackExceptionEvent";
  /**
   * The exception that occurred.
   */
  exception?: Exception;
  /**
   * The error that occurred.
   */
  error: string;
}

export interface TrackStuckEvent extends PlayerEvent {
  type: "TrackStuckEvent";
  thresholdMs: number;
}

export interface WebSocketClosedEvent extends PlayerEvent {
  type: "WebSocketClosedEvent";
  /**
   * The code sent by discord. https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
   */
  code: number;
  /**
   * If it was remotely closed.
   */
  byRemote: boolean;
  /**
   * The reason the websocket closed.
   */
  reason: string;
}