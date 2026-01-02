# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/lib/android/sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

-keep class com.noescape.** { *; }
-dontwarn com.noescape.**

-keepattributes *Annotation*
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes Signature
-keepattributes SourceFile

# react-native-sound
-keep class com.zendesk.util.** { *; }
-dontwarn com.zendesk.util.**

# react-native-google-mobile-ads
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# react-native-sensors
-keep class com.sensors.** { *; }
-dontwarn com.sensors.**
