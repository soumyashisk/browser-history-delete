## ⚠️ I MADE THIS FOR FUN, DON'T TAKE IT SERIOUSLY

# 🔥 Browser History Delete 🔥

> **"I was just doing research, I swear!"** - Every developer ever

## What is this?

You know that moment when you're about to share your screen in a meeting and your browser's autocomplete tries to out you in front of your entire team? Yeah, we've all been there. This is your get-out-of-jail-free card.

**Browser History Delete** is a surgical strike tool that goes into your Chrome history database like a digital hitman and makes certain... _memories_... disappear. No questions asked. No judgment. Just pure, unadulterated history annihilation.

## Why does this exist?

Let's be honest:

- ❌ "Just use Incognito mode" - Yeah, but you forgot, didn't you?
- ❌ "Just don't browse that stuff" - LOL
- ❌ "Manually delete from Chrome" - Too slow, leaves traces, and Chrome judges you
- ✅ **This tool** - Fast, efficient, and doesn't snitch

## Features

- 🎯 **Precision Deletion**: Uses keywords to nuke specific entries (you know which ones)
- ⚡ **Blazing Fast**: Built with Bun because your panic should be efficient
- 🤫 **Silent Operator**: No logs, no traces, just results
- 💣 **Bulk Destruction**: Got a whole list? Drop it in `queries.txt` and watch the magic happen
- 🔒 **Direct Database Access**: Goes straight to the source - Chrome's SQLite database

## Installation

```bash
bun i
```

Yeah, that's it. We don't overcomplicate things here.

## Configuration

### Step 1: Set your history path

Edit `historypath.txt` and add your Chrome history path (relative to home directory):

```
AppData\Local\Google\Chrome\User Data\Default\History
```

### Step 2: List your shame

Edit `queries.txt` and add the keywords you want to purge. One per line. We won't judge. Much.

```
keyword1
keyword2
that-site-you-visited-at-3am
definitely-not-work-related
```

## Usage

⚠️ **IMPORTANT**: Close Chrome before running this. Like, actually close it. Not just the windows. Check your Task Manager. Chrome has more processes than a government bureaucracy.

```bash
bun .
```

Watch as your sins are forgiven. 🙏

## Advanced: Compile for Stealth Mode

Want this as a standalone executable you can run without leaving traces? We got you:

```bash
bun build --compile --minify --sourcemap --bytecode ./index.js --outfile browserHistoryDelete
```

Now you can run `./browserHistoryDelete` without even having Node/Bun installed. Perfect for... emergency situations. 👀

## How it works

1. Reads your hit list from `queries.txt`
2. Opens Chrome's SQLite database like a burglar with a PhD
3. Finds all URLs and titles matching your keywords
4. Deletes visits first (because foreign keys are a thing)
5. Deletes the URLs themselves
6. Leaves no trace it was ever there

It's like `Ctrl+H` → `Delete`, but for people with _actual problems_.

## FAQ

**Q: Is this legal?**  
A: It's your browser history. Do whatever you want with it. We're not the FBI.

**Q: Will this protect me from my ISP/employer/government?**  
A: LOL no. This only cleans _local_ history. Use a VPN if you're doing anything actually questionable.

**Q: Can I recover deleted history?**  
A: Not from this tool. It's gone. Like, _gone_ gone. Choose your keywords wisely.

**Q: Why Bun and not Node?**  
A: Because when you need to delete your history, you need it done FAST. Also, Bun is cool and we're hipsters.

**Q: Does this work on other browsers?**  
A: Currently Chrome only. Firefox version coming soon™ (maybe, if we remember).

**Q: My friend wants to know if—**  
A: We both know it's not for your friend. Just run the damn tool.

## Disclaimer

This tool is for educational purposes and personal privacy management. The authors are not responsible for:

- Your poor life choices
- Awkward conversations with HR
- Explaining to your partner why you needed this
- The existential dread that follows
- Any legal issues arising from what you were actually browsing

Use responsibly. Or don't. We're a README file, not a cop.

## Contributing

Got ideas? Found a bug? Want to add Firefox support because Chrome isn't the only browser with dirty secrets?

PRs welcome! Just don't commit your `queries.txt` file. Please. We're begging you.

## License

MIT - Because even your bad decisions deserve to be free and open source.

---

_Remember: The best way to avoid needing this tool is to use Incognito mode._

_But since you're here... we won't tell if you won't._ 😉🤐
