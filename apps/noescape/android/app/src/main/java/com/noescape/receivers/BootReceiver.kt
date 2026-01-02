package com.noescape.receivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.noescape.services.AlarmForegroundService

class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null) return

        when (intent?.action) {
            Intent.ACTION_BOOT_COMPLETED,
            "android.intent.action.QUICKBOOT_POWERON" -> {
                // Start the foreground service after device boot
                AlarmForegroundService.startService(context)
            }
        }
    }
}
