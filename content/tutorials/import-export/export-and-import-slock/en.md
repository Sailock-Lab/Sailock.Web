---
title: Export and import a .slock backup
description: Move your vault between devices, or keep a safe copy, with an encrypted .slock file.
order: 1
updated: 2026-11-15
draft: true
---

A `.slock` file is an **encrypted copy of your vault**. You use it to keep a backup, to move to a new phone or computer, or to share data between Sailock for Windows and Sailock for Android.

## How it is protected

When you export, you choose a **password for the file**. It can be different from your master password. Without it the file cannot be opened, so keep it safe.

## Export a copy

1. Open the settings and choose the export option.
2. Choose a password for the file and repeat it.
3. Choose where to save the `.slock` file.

> **Tip:** store a copy outside your device (an external drive or your own cloud storage). The file is encrypted, but it is only useful if you can reach it when you need it.

## Import a copy

1. Open the settings and choose the import option.
2. Select the `.slock` file.
3. Enter the password you chose when you exported it.

Entries that already exist in your vault are not duplicated. New ones are added.

## Windows and Android

Both apps use the same format. If you use an older version of Sailock for Windows (before 2.3.2), export from Android with the option for older Windows versions: the backup then keeps your entries but not folders, tags, categories or custom templates.

## Moving to a new device

1. On the old device, export a `.slock` backup.
2. Copy the file to the new device (cable, cloud or any other way you trust).
3. On the new device, install Sailock, create a vault and import the file.
