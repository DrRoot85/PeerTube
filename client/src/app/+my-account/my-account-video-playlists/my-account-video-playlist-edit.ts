import { FormReactive, SelectChannelItem } from '@app/shared/shared-forms'
import { VideoConstant, VideoPlaylistPrivacy } from '@shared/models'
import { VideoPlaylist } from '@shared/models/videos/playlist/video-playlist.model'

export abstract class MyAccountVideoPlaylistEdit extends FormReactive {
  // Declare it here to avoid errors in create template
  videoPlaylistToUpdate: VideoPlaylist
  userVideoChannels: SelectChannelItem[] = []
  videoPlaylistPrivacies: VideoConstant<VideoPlaylistPrivacy>[] = []

  abstract isCreation (): boolean
  abstract getFormButtonTitle (): string
}
