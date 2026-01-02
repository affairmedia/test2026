package com.noescape

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "NoEscape"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  override fun onBackPressed() {
    // Prevent back button when alarm is ringing
    // Check if current route is AlarmRingScreen
    // For now, we handle this in React Native
    super.onBackPressed()
  }
}
