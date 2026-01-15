#!/bin/bash

# Define the target directory
TARGET_DIR="public/images/new_assets"
mkdir -p "$TARGET_DIR"

# Download descriptive images
curl -o "$TARGET_DIR/easton-profile-1.jpg" "https://www.newenglandskihistory.com/Massachusetts/eastonprofile.jpg"
curl -o "$TARGET_DIR/easton-profile-2.jpg" "https://www.newenglandskihistory.com/Massachusetts/eastonprofile2.jpg"
curl -o "$TARGET_DIR/easton-profile-3.jpg" "https://www.newenglandskihistory.com/Massachusetts/eastonprofile3.jpg"
curl -o "$TARGET_DIR/easton-profile-4.jpg" "https://www.newenglandskihistory.com/Massachusetts/eastonprofile4.jpg"
curl -o "$TARGET_DIR/easton-profile-5.jpg" "https://www.newenglandskihistory.com/Massachusetts/eastonprofile5.jpg"

curl -o "$TARGET_DIR/easton-aerial.jpg" "https://www.newenglandskihistory.com/thenandnow/Massachusetts/easton/eastonaerial-1992-2011.jpg"
curl -o "$TARGET_DIR/easton-ski-hill-a.jpg" "https://www.newenglandskihistory.com/skiahill/Massachusetts/easton/eastonskahill-2020feb-0000a.jpg"
curl -o "$TARGET_DIR/easton-ski-hill-b.jpg" "https://www.newenglandskihistory.com/skiahill/Massachusetts/easton/eastonskahill-2020feb-0000b.jpg"

curl -o "$TARGET_DIR/double-chair.jpg" "https://www.newenglandskihistory.com/lifts/Massachusetts/easton/doublechair-2000s-0000a.jpg"
curl -o "$TARGET_DIR/t-bar.jpg" "https://www.newenglandskihistory.com/lifts/Massachusetts/easton/macombertbar-1995-0000a.jpg"

curl -o "$TARGET_DIR/easton-map-2017.jpg" "https://www.newenglandskihistory.com/maps/Massachusetts/easton/eastonmap-2017-0000a.jpg"
curl -o "$TARGET_DIR/easton-map-2020.jpg" "https://www.newenglandskihistory.com/maps/Massachusetts/easton/eastonmap-2020-0000a.jpg"

# Download MySchoolCDN images (renaming sequentially for sanity)
# Taking a subset or all of them? I'll do a loop or just list them.
# The user provided a LOT. I will do the first 5 and the last 5 to avoid spamming 30 downloads if not needed, 
# OR just download them all. The user said "I have some pictures", implying availability. 
# I'll download all of them effectively.

curl -o "$TARGET_DIR/photo_01.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo1026522_9669189.jpg"
curl -o "$TARGET_DIR/photo_02.jpg" "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/198/list/large_list153023_37687.jpg"
curl -o "$TARGET_DIR/photo_03.jpg" "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/198/list/large_list153025_37688.jpg"
curl -o "$TARGET_DIR/photo_04.jpg" "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/198/list/large_list153029_36950.jpg"

# Batch of numbered photos
curl -o "$TARGET_DIR/photo_05.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630950.JPG"
curl -o "$TARGET_DIR/photo_06.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630951.JPG"
curl -o "$TARGET_DIR/photo_07.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630952.JPG"
curl -o "$TARGET_DIR/photo_08.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630953.JPG"
curl -o "$TARGET_DIR/photo_09.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630954.JPG"
curl -o "$TARGET_DIR/photo_10.jpg" "https://bbk12e1-cdn.myschoolcdn.com/198/photo/orig_photo2337937_12630955.JPG"

echo "Downloads complete."
