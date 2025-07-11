var os = require('os')
var path = require('path')

var platform = os.platform()
//patch for compatibilit with electron-builder, for smart built process.
if(platform == "darwin"){
	platform = "mac";
}else if(platform == "win32"){
	platform = "win";
}
//adding browser, for use case when module is bundled using browserify. and added to html using src.
if (platform !== 'linux' && platform !== 'mac' && platform !== 'win' && platform !=="browser") {
  console.error('Unsupported platform.', platform);
  process.exit(1)
}

var arch = os.arch()
if (platform === 'mac' && (arch !== 'x64' &&  arch !== 'arm64' )) {
  console.error('Unsupported architecture.')
  process.exit(1)
}

var ffmpegPath = path.join(
  __dirname,
  'bin',
  platform,
  arch,
  platform === 'win' ? 'ffmpeg.exe' : 'ffmpeg'
)

var ffmpegPath_cropdetect = path.join(
  __dirname,
  'bin',
  platform,
  arch,
  platform === 'win' ? 'ffmpeg_cropdetect.exe' : 'ffmpeg_cropdetect'
)

exports.path = ffmpegPath;
exports.path_cropdetect = ffmpegPath_cropdetect;