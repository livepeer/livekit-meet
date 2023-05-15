import { formatChatMessageLinks, LiveKitRoom, VideoConference } from '@livekit/components-react';
import { LogLevel, VideoPresets, Room, RoomEvent } from 'livekit-client';
import { useRouter } from 'next/router';
import { DebugMode } from '../../lib/Debug';
import React from 'react';

export default function CustomRoomConnection() {
  const router = useRouter();
  const { liveKitUrl, token } = router.query;

  const myRoom = new Room({
    videoCaptureDefaults: {
      resolution: VideoPresets.h540,
    },
    publishDefaults: {
      videoEncoding: {
        maxBitrate: 600_000,
        maxFramerate: 30,
      },
      screenShareEncoding: {
        maxBitrate: 1_000_000,
        maxFramerate: 30,
      },
    },
  });

  const logTrackInfo = function() {
    console.log('participant count: ' + myRoom.participants.size)
    myRoom.participants.forEach((p) => {
      p.audioTracks.forEach((t) => {
        console.log('participant tracks', 'participant', p.name, 'track', t)
      });
    });
  }

  const onPlaybackStatusChanged = React.useCallback((status) => {
    logTrackInfo()
    console.log('onPlaybackStatusChanged. status: ' + status)
  }, []);
  const onTrackSubscribed = React.useCallback((track, publication, participant) => {
    logTrackInfo()
    console.log('onTrackSubscribed.', 'track', track, 'participant', participant)
  }, [])
  const onTrackUnSubscribed = React.useCallback((track, publication, participant) => {
    logTrackInfo()
    console.log('onTrackUnSubscribed.', 'track', track, 'participant', participant)
  }, [])

  if (typeof liveKitUrl !== 'string') {
    return <h2>Missing URL</h2>;
  }
  if (typeof token !== 'string') {
    return <h2>Missing token</h2>;
  }

  myRoom.connect(liveKitUrl, token)
  myRoom
      .on(RoomEvent.AudioPlaybackStatusChanged, onPlaybackStatusChanged)
      .on(RoomEvent.TrackSubscribed, onTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, onTrackUnSubscribed)

  return (
    <main data-lk-theme="default">
      {liveKitUrl && (
        <LiveKitRoom room={myRoom} audio={true} video={true}>
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.debug} />
        </LiveKitRoom>
      )}
    </main>
  );
}
