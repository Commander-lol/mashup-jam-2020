#!/usr/bin/env bash

for file in ./raw/audio/*.wav; do
  ffmpeg -y -i "$file" "./src/assets/sounds/$(basename "${file%.wav}").mp3";
done;