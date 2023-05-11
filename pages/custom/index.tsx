import { formatChatMessageLinks, LiveKitRoom, VideoConference } from '@livekit/components-react';
import { LogLevel, VideoPresets } from 'livekit-client';
import { useRouter } from 'next/router';
import { DebugMode } from '../../lib/Debug';

export default function CustomRoomConnection() {
  const router = useRouter();
  const { liveKitUrl, token } = router.query;
  if (typeof liveKitUrl !== 'string') {
    return <h2>Missing URL</h2>;
  }
  if (typeof token !== 'string') {
    return <h2>Missing token</h2>;
  }

  const roomOptions = {
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
    }
  };

  return (
    <main data-lk-theme="default">
      {liveKitUrl && (
        <LiveKitRoom token={token} serverUrl={liveKitUrl} audio={true} video={true} options={roomOptions}>
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
      )}
    </main>
  );
}
