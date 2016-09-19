# The platform: ios or android
PLATFORM=$1
if [ "$PLATFORM" == "" ]; then
    PLATFORM="android"
fi

# The target: device, simulator (ios) or emulator (android)
TARGET=$2
if [ "$TARGET" == "" ]; then
    TARGET="device -C ea41f236baedc4a8edbd8d3f41dd315df90a4c66"
fi

# Y for choosing destination, N for the default
CHOICE=$3
if [ "$CHOICE" == "" ]; then
    CHOICE="N"
fi

if [ "$PLATFORM" == "dist-adhoc" ]; then
    ti build --platform ios --force --target $PLATFORM --pp-uuid "5a4ca7ec-1b72-4bfa-b7ad-067e00dd4d21"
else
    if [ "$CHOICE" == "Y" ]; then
        ti build --platform $PLATFORM --log-level debug --target $TARGET --device-id
    else
        ti build --platform $PLATFORM --log-level debug --target $TARGET
    fi
fi
