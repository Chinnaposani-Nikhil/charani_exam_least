// "use client";
// import { useEffect } from "react";

// const SecurityEnforcer = () => {
//     useEffect(() => {
//         // Helper to safe clear clipboard
//         const safeClearClipboard = () => {
//             if (navigator.clipboard && navigator.clipboard.writeText) {
//                 navigator.clipboard.writeText("").catch((err) => {
//                     // Suppress NotAllowedError which happens if not focused
//                     console.warn("Clipboard clear prevented:", err);
//                 });
//             }
//         };

//         // Helper to hide/show content
//         const setContentVisibility = (visible) => {
//             const value = visible ? "visible" : "hidden";
//             document.documentElement.style.visibility = value;

//             // Also blank the clipboard if hiding
//             if (!visible) {
//                 safeClearClipboard();
//             }
//         };

//         // 1. Disable Back Button
//         const handlePopState = () => {
//             window.history.pushState(null, "", window.location.href);
//         };
//         window.history.pushState(null, "", window.location.href);
//         window.addEventListener("popstate", handlePopState);

//         // 2. Disable Page Refresh
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = "";
//         };
//         window.addEventListener("beforeunload", handleBeforeUnload);

//         // 3. Lock Keys (Aggressive)
//         const lockKeys = async () => {
//             if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
//                 try {
//                     // This creates the "exclusive" lock that prevents the OS overlay
//                     await navigator.keyboard.lock(["Escape", "PrintScreen"]);
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         };
//         // Trigger lock on any interaction
//         window.addEventListener('click', lockKeys);
//         window.addEventListener('keydown', lockKeys);
//         window.addEventListener('mousedown', lockKeys);
//         window.addEventListener('focus', lockKeys); // Added focus listener

//         // 4. Handle Key Down (Block Shortcuts)
//         const handleKeyDown = (e) => {
//             // Block standard shortcuts
//             if (
//                 e.key === "F5" ||
//                 (e.ctrlKey && (e.key === "r" || e.key === "R")) ||
//                 (e.key === "F12") ||
//                 (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
//                 (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
//                 (e.key === "Escape") ||
//                 (e.key === "Tab") ||
//                 (e.key === "Alt + Tab") ||
//                 (e.key === "tab") ||
//                 (e.key === "alt + tab") ||
//                 (e.altKey)
//             ) {
//                 e.preventDefault();
//                 e.stopPropagation();
//             }

//             // DETECT PRINT SCREEN
//             if (e.key === "PrintScreen" || e.key === "prt sc") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 e.stopImmediatePropagation();

//                 // Immediately hide content
//                 setContentVisibility(false);
//                 return false;
//             }
//         };
//         window.addEventListener("keydown", handleKeyDown, true);

//         // 5. Handle Key Up
//         const handleKeyUp = (e) => {
//             if (e.key === "PrintScreen" || e.key === "prt sc" ) {
//                 // DO NOT automatically show content here.
//                 // The Snipping Tool overlay might still be open.
//                 // We leave it hidden until the user clicks back (Focus event).
//                 safeClearClipboard();
//             }
//         };
//         window.addEventListener("keyup", handleKeyUp, true);

//         // 6. WINDOW BLUR (Crucial for Snipping Tool)
//         // When the Snipping Tool bar opens, the browser loses focus.
//         // We immediately hide the screen.
//         const handleWindowBlur = () => {
//             setContentVisibility(false); // Hide everything
//         };

//         // 7. WINDOW FOCUS
//         // When they close the tool and click back on the test, we show content.
//         const handleWindowFocus = () => {
//             setContentVisibility(true); // Show everything
//             lockKeys(); // Re-apply lock
//         };

//         window.addEventListener("blur", handleWindowBlur);
//         window.addEventListener("focus", handleWindowFocus);

//         // 8. Disable Context Menu
//         const handleContextMenu = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//         };
//         window.addEventListener("contextmenu", handleContextMenu, true);

//         // 9. Disable Copy/Paste
//         const handleCopyCutPaste = (e) => {
//             e.preventDefault();
//         }
//         window.addEventListener("copy", handleCopyCutPaste, true);
//         window.addEventListener("cut", handleCopyCutPaste, true);
//         window.addEventListener("paste", handleCopyCutPaste, true);

//         // Cleanup
//         return () => {
//             window.removeEventListener("popstate", handlePopState);
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//             window.removeEventListener("keydown", handleKeyDown, true);
//             window.removeEventListener("keyup", handleKeyUp, true);
//             window.removeEventListener("blur", handleWindowBlur);
//             window.removeEventListener("focus", handleWindowFocus);
//             window.removeEventListener("contextmenu", handleContextMenu, true);
//             window.removeEventListener("copy", handleCopyCutPaste, true);
//             window.removeEventListener("cut", handleCopyCutPaste, true);
//             window.removeEventListener("paste", handleCopyCutPaste, true);
//             window.removeEventListener('click', lockKeys);
//             window.removeEventListener('keydown', lockKeys);
//             window.removeEventListener('mousedown', lockKeys);
//             window.removeEventListener('focus', lockKeys);
//         };
//     }, []);

//     return null;
// };

// export default SecurityEnforcer;

// --- 1. DISABLE RIGHT CLICK (Inspect Element) ---

// "use client";
// import { useEffect } from "react";

// const SecurityEnforcer = () => {
//     useEffect(() => {

//         // --- 1. DISABLE RIGHT CLICK (Inspect Element) ---
//         const handleContextMenu = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             return false;
//         };

//         // --- 2. KEYBOARD BLOCKING LOGIC ---
//         const handleKeyDown = (e) => {

//             // A. BLOCK ALL FUNCTION KEYS (F1 - F12)
//             // This covers F1 (Help), F5 (Refresh), F11 (Fullscreen), F12 (Inspect)
//             if (e.key && e.key.startsWith("F") && !isNaN(e.key.slice(1))) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // B. BLOCK CONTROL (Ctrl) AND ALT KEYS
//             // Disables Ctrl+C, Ctrl+V, Ctrl+P, Alt+Tab (if captured)
//             if (e.ctrlKey || e.altKey || e.metaKey) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // C. BLOCK INSPECT ELEMENT SHORTCUTS SPECIFICALLY
//             // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U (View Source)
//             if (
//                 (e.ctrlKey && e.shiftKey && e.key && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
//                 (e.ctrlKey && e.key && e.key.toUpperCase() === "U")
//             ) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // D. BLOCK PRINT SCREEN & SNAPSHOTS
//             if (e.key === "PrintScreen" || e.key === "prt sc" || e.key === "ScreenShot") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 if (navigator.clipboard) {
//                     navigator.clipboard.writeText(""); // Clear clipboard
//                 }
//                 return false;
//             }
//             // E. Block Windows Key (Meta) - prevents opening Start Menu
//             if (e.key === "Meta" || e.key === "OS") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }
//             // E. BLOCK TAB (Navigation)
//             if (e.key === "Tab") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }
//         };

//         // --- 3. ATTEMPT TO LOCK KEYS (Kiosk behavior) ---
//         const lockSystemKeys = async () => {
//             if ("keyboard" in navigator && "lock" in navigator.keyboard) {
//                 try {
//                     // Try to lock everything we can
//                     await navigator.keyboard.lock([
//                         "Escape", "PrintScreen", "F1", "F2", "F3", "F4", "F5",
//                         "F6", "F7", "F8", "F9", "F10", "F11", "F12",
//                         "Tab", "AltLeft", "AltRight"
//                     ]);
//                 } catch (err) {
//                     console.log("Key lock failed (requires full screen)", err);
//                 }
//             }
//         };

//         // --- 4. FORCE FULL SCREEN ON INTERACTION ---
//         const enforceFullScreen = () => {
//             const doc = document.documentElement;
//             if (!document.fullscreenElement) {
//                 doc.requestFullscreen().catch(() => {
//                     // Silent catch
//                 });
//             }
//         };

//         // --- LISTENERS ---
//         // 'true' uses Capturing Phase (triggers before bubbling)
//         document.addEventListener("contextmenu", handleContextMenu, true);
//         document.addEventListener("keydown", handleKeyDown, true);

//         // Re-apply locks when user clicks or focuses
//         window.addEventListener("focus", lockSystemKeys);
//         window.addEventListener("click", () => {
//             lockSystemKeys();
//             enforceFullScreen();
//         });

//         lockSystemKeys(); // Initial try

//         return () => {
//             document.removeEventListener("contextmenu", handleContextMenu, true);
//             document.removeEventListener("keydown", handleKeyDown, true);
//             window.removeEventListener("focus", lockSystemKeys);
//         };
//     }, []);

//     return null;
// };

// export default SecurityEnforcer;

// "use client";
// import { useEffect } from "react";

// const SecurityEnforcer = () => {
//     useEffect(() => {

//         // --- 1. DISABLE RIGHT CLICK ---
//         const handleContextMenu = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             return false;
//         };

//         // --- 2. KEYBOARD BLOCKING LOGIC ---
//         const handleKeyDown = (e) => {
//             // A. BLOCK ALT + TAB (And all Alt combinations)
//             if (e.altKey || e.key === "Tab") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // B. BLOCK WINDOWS KEY (Meta) + TAB / D
//             // This prevents Win+Tab (Task View), Win+D (Show Desktop), and opening Start Menu
//             if (e.metaKey || e.key === "Meta" || e.key === "OS") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // C. BLOCK FUNCTION KEYS (F1 - F12)
//             if (e.key && e.key.startsWith("F") && !isNaN(e.key.slice(1))) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // D. BLOCK CTRL KEYS (Copy, Paste, Print, Inspect)
//             if (e.ctrlKey) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 return false;
//             }

//             // E. BLOCK PRINT SCREEN
//             if (e.key === "PrintScreen" || e.key === "prt sc" || e.key === "ScreenShot") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 if (navigator.clipboard) {
//                     navigator.clipboard.writeText(""); 
//                 }
//                 return false;
//             }
//         };

//         // --- 3. SYSTEM KEY LOCK (Crucial for Alt+Tab / Win Keys) ---
//         // This requests the browser to "swallow" these keys so the OS doesn't see them.
//         const lockSystemKeys = async () => {
//             if ("keyboard" in navigator && "lock" in navigator.keyboard) {
//                 try {
//                     await navigator.keyboard.lock([
//                         "Escape", "PrintScreen", 
//                         "Tab", "AltLeft", "AltRight", 
//                         "MetaLeft", "MetaRight", // Windows Keys
//                         "F1", "F5", "F11", "F12" 
//                     ]);
//                 } catch (err) {
//                     console.log("Keyboard lock failed (requires user to be in fullscreen first)", err);
//                 }
//             }
//         };

//         // --- 4. AGGRESSIVE FULLSCREEN ENFORCEMENT ---
//         const enforceFullScreen = () => {
//             const doc = document.documentElement;
//             if (!document.fullscreenElement) {
//                 doc.requestFullscreen()
//                     .then(() => {
//                         // Once success, re-lock keys immediately
//                         lockSystemKeys();
//                     })
//                     .catch(() => {
//                         // Silent fail if browser blocks it (waits for next user click)
//                     });
//             }
//         };

//         // --- 5. "DISABLE" X BUTTON LOGIC ---
//         // Browser logic: You cannot "prevent" the X click, but you can
//         // immediately UNDO it.
//         const handleFullscreenChange = () => {
//             if (!document.fullscreenElement) {
//                 // User just exited. Try to force them back INSTANTLY.
//                 enforceFullScreen();
//             } else {
//                 // If they entered fullscreen, ensure keys are locked
//                 lockSystemKeys();
//             }
//         };

//         // --- LISTENERS ---
//         document.addEventListener("contextmenu", handleContextMenu, true);
//         document.addEventListener("keydown", handleKeyDown, true);
//         document.addEventListener("fullscreenchange", handleFullscreenChange);

//         // RE-ENFORCE ON EVERY INTERACTION
//         // If 'Auto-Bounce' failed (browser blocked it), these ensure
//         // the very next micro-interaction fixes it.
//         window.addEventListener("click", enforceFullScreen);
//         window.addEventListener("mouseup", enforceFullScreen);
//         window.addEventListener("focus", () => {
//             enforceFullScreen();
//             lockSystemKeys();
//         });
        
//         // Anti-Alt+Tab Measure: If window loses focus, try to grab it back
//         window.addEventListener("blur", () => {
//             setTimeout(enforceFullScreen, 50);
//         });

//         // Initial Start
//         lockSystemKeys(); 

//         return () => {
//             document.removeEventListener("contextmenu", handleContextMenu, true);
//             document.removeEventListener("keydown", handleKeyDown, true);
//             document.removeEventListener("fullscreenchange", handleFullscreenChange);
//             window.removeEventListener("click", enforceFullScreen);
//             window.removeEventListener("mouseup", enforceFullScreen);
//             window.removeEventListener("focus", enforceFullScreen);
//         };
//     }, []);

//     return null;
// };

// export default SecurityEnforcer;

"use client";
import { useEffect } from "react";

const SecurityEnforcer = () => {
    useEffect(() => {

        // --- 1. DISABLE RIGHT CLICK ---
        const handleContextMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // --- 2. DISABLE BROWSER BACK BUTTON (History Trap) ---
        // This pushes the current state into history. If they click back,
        // it just loads the same state again, effectively disabling the button.
        const disableBackButton = () => {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, "", window.location.href);
            };
        };
        disableBackButton();

        // --- 3. KEYBOARD BLOCKING LOGIC ---
        const handleKeyDown = (e) => {
            // A. STRICTLY BLOCK CTRL KEY (Copy, Paste, Find, etc.)
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // B. BLOCK ALT + TAB (And all Alt combinations)
            if (e.altKey || e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // C. BLOCK WINDOWS KEY (Meta) + TAB / D
            if (e.metaKey || e.key === "Meta" || e.key === "OS") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // D. BLOCK FUNCTION KEYS (F1 - F12)
            if (e.key && e.key.startsWith("F") && !isNaN(e.key.slice(1))) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // E. BLOCK PRINT SCREEN
            if (e.key === "PrintScreen" || e.key === "prt sc" || e.key === "ScreenShot") {
                e.preventDefault();
                e.stopPropagation();
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(""); 
                }
                return false;
            }
        };

        // --- 4. SYSTEM KEY LOCK (Crucial for Alt+Tab / Win Keys) ---
        const lockSystemKeys = async () => {
            if ("keyboard" in navigator && "lock" in navigator.keyboard) {
                try {
                    await navigator.keyboard.lock([
                        "Escape", "PrintScreen", 
                        "Tab", "AltLeft", "AltRight", 
                        "MetaLeft", "MetaRight", // Windows Keys
                        "ControlLeft", "ControlRight", // Lock Ctrl keys
                        "F1", "F5", "F11", "F12" 
                    ]);
                } catch (err) {
                    console.log("Keyboard lock failed", err);
                }
            }
        };

        // --- 5. AGGRESSIVE FULLSCREEN ENFORCEMENT ---
        const enforceFullScreen = () => {
            const doc = document.documentElement;
            if (!document.fullscreenElement) {
                doc.requestFullscreen()
                    .then(() => {
                        lockSystemKeys();
                    })
                    .catch(() => {
                        // Silent fail if browser blocks it
                    });
            }
        };

        // --- 6. "DISABLE" X BUTTON LOGIC ---
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                enforceFullScreen();
            } else {
                lockSystemKeys();
            }
        };

        // --- LISTENERS ---
        document.addEventListener("contextmenu", handleContextMenu, true);
        document.addEventListener("keydown", handleKeyDown, true);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // RE-ENFORCE ON EVERY INTERACTION
        window.addEventListener("click", enforceFullScreen);
        window.addEventListener("mouseup", enforceFullScreen);
        window.addEventListener("focus", () => {
            enforceFullScreen();
            lockSystemKeys();
        });
        
        window.addEventListener("blur", () => {
            setTimeout(enforceFullScreen, 50);
        });

        // Initial Start
        lockSystemKeys(); 
        disableBackButton(); // Ensure history is pushed on mount

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu, true);
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("click", enforceFullScreen);
            window.removeEventListener("mouseup", enforceFullScreen);
            window.removeEventListener("focus", enforceFullScreen);
            // Clean up back button logic (optional, but good practice)
            window.onpopstate = null;
        };
    }, []);

    return null;
};

export default SecurityEnforcer;