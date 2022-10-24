# floating-ui-x
Implementation of [@floating-ui](https://github.com/floating-ui/floating-ui/) primitives for platforms other than React. 

## Goals
1. keep api as close as possible to the original package, so that we can leverage their existent documentation site. Exceptions can be made if platform has a fundamental different way of doing things.
1. make it good enough to request integration into `floating-ui` monorepo, because I don't deserve nor want the burden of maintaining this alone.

## No TypeScript?! 😱😱
I'm adding this chapter in the unlikely event of this getting shared somewhere. _Why aren't you writing this in TypeScript in 2022?! Are you mad mate?!_:

No, I just prioritize features over types **for the free time** I will spend on this. I've worked with TypeScript but i'm not a TypeScript jedi neither a fanboy. As such, I prefer to spend my **free effort** on keeping feature-parity with the original package than in finding solutions for the type hieroglyphs problems that come from consumers of "platform X"  package. The cost does not yet justifies the means, because typescript is **very** time consuming for library developers[^1]. — _It is. No mate, it is. Did I mentioned I'm doing this for free and have a newborn son?_ — Also typescript typically discourages contributions from less "senior" javascript people and attracts the self-crowned js gurus. I'm sorry, I just have a thing for people with a _beginners' mind_.

If you reading this and want TypeScript so badly, please note that I accept the corresponding type definitions files, and even kickstart this with some a few ones — _See i'm not that stubborn_. 

Here's some [guidelines](https://github.com/sindresorhus/typescript-definition-style-guide) on how to do it take some of the points with a pinch of salt. But as i've said before, if someone contributes with a cool feature that works but can't make `tsc` happy I will ship it anyways.

[1^]: https://erock.prose.sh/typescript-terrible-for-library-developers

## Motivation
Because poppers/tooltips/fly-outs are something I'll use in every web project during my dev career, independently of the tech stack, and popper.js (now floating-ui) is the best position engine out there.

## Acknowledgements
It started as a fork from https://github.com/allindevelopers/vue-floating-ui/pull/1