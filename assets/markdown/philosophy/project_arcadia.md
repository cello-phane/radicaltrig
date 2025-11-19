## Table Of Contents {: #toc }

## Preamble

Some of my aims, especially the incorporation of external resources into the system, might induce the opinion that I want to rob the work of other people, which is most definitely not the case. I will always give credit where credit is due, as those who worked on discovering knowledge did something nobody else did, and thereby deserve recognition and respect. I do **not** believe in the flawed concept of intellectual property, as you cannot claim something that has been there since the begin of time and that will be there forever, only because you've uncovered it. Monetary compensation is a whole other topic, one that I do not yet have fully decided my viewpoint on, which is why it may be ethically delicate to digitize books and thereby making them accessible free of charge to everybody, hurting their author's intakes.

The latter concern is not of high effect, as most modern books (whose authors are still alive to make said money) are garbage anyways, and those dusty-old tomes I want to digitize won't hurt anybody.

## Name Origin

Why "Arcadia"? As with all sound knowledge, theorems should be derived rigorously, based on a few atomic base principles or observations. Such a structure looks similar to that of a tree, even if it - strictly speaking - will be that of a graph. In my opinion, deep and *clear* thinking goes hand in hand with being in sync with nature, as consciousness seems to be always bound to a body, to a vehicle; a vehicle that's worthy of being well-kept and handled with care. In that spirit, I strongly associate knowledge with mother nature, while nature has become an indispensable place of refuge to me over the last few years.

The game "BioShock", which has helped me tremendously to get through hard, dark and disheartening episodes of my life (as many other fictional places did), contains a level called "Arcadia": a beautiful garden, growing in an underwater city, a city which provided refuge to some, while this garden provided their vehicles with the necessary oxygen and nutrition.

May "Arcadia" now provide refuge to those who are sick and tired of wishy-washy, fever-dream like, authoritarian and mainstream "knowledge" and "wisdom", so that they can satisfy their curiosity - the most natural drive to ever exist, without the dead end brought into existence through made-up rules.

## Solved Problem

Judging by my own experience, I believe that a conscious being stores its acquired knowledge by persisting small and coherent chunks of information. These chunks then link back to other bits and pieces, dependencies which they build upon by augmentation: by either adding new data, or by making further derivations.

I claim that whenever new knowledge is gathered, and said knowledge is not already partitioned into small-enough units of information, the being does not only have to work through what it's trying to study, but has to also go through the process of structuring, which can be quite overwhelming, as a logical structure depends on the understanding of the subject at hand, which again depends on a proper structure. This additional difficulty may overshoot the threshold of activation energy the being is willing and able to bring up, and so its initial will of studing the subject becomes suffocated and slowly fades out.

While there is no common definintion regarding a smallest unit which matches everybody, someone who has the ability to store bigger chunks should not experience an inconvenience by studying what has been partitioned smaller than that, as their brain will automatically accumulate accordingly, while the other way around can be detrimental.

Another advantage of small units is deduplication, which allows information to be stored and managed centrally, without having to keep track of sites where the same underlying idea is represented slightly different each time, whenever it's required to update a certain chunk.

The author of any knowledge is reminded to rethink the structure of what they're trying to share, and thereby reminded of any holes (assumptions) which may be clear as day to them, but somebody else might totally miss. By providing every little detail, nobody is excluded when it comes to true and deep understanding, as it's all there, to be explored recursively, at a speed of progress comfortable with.

## Main Idea

Books, especially those of ancient times, have proven themselves as a great mean to convey knowledge. While modern day videos, podcasts or complex websites may evoke the impression that they do just as good of a job as books do, that's just not the case. The more complexity is added to an already complex subject, the harder it will be to understand. If a book didn't manage to convey something a long-wided explanatory video could, that only means that the contents of the book were malformed in the first place and need to be reworked.

The main idea now is to modernize books the right way, by adding quick and intuitive navigation as well as interactivity in regards to the presented concepts. I still strive for simplicity, which is why I believe that the whole experience should be described by nothing but UTF text: natural language and code.

If this idea pans out, schools, universities, lectures, teachers and professors would no longer be needed, as they do nothing but to incrementally flesh out an idea, over and over again, which is an activity that does not only waste their time, but also doesn't allow each and everybody within a classroom of multiple dozens of students to get their questions answered, as a multitude of assumptions are made on a daily basis. I think that it's an insult to our potential as a species to keep knowledge locked behind the doors of schools and universities, which each have their own commitments and liabilities attached. What if I do not want to accept these, if I decline authoritarianism, am I now all of a sudden no longer worthy to receive this knowledge? This little fact speaks volumes about our society.

### Markdown

To structure text efficiently, only a few features are required, which are as follows:

- Headlines and sub-headlines (h1 until h4 shall suffice)
- Cursive, bold, underlined and strike-through text
- Hyperlinks to either external or internal resources
- Text coloration
- Monospaced text-/code-boxes with optional syntax highlighting and line numbers
- Images
- Lists (bullet-points, dashes, numbers)
- Footnotes
- Alerts (todo, warning, info)
- Collapsible sections
- Simple tables

(And maybe some other bits I forgot about)

Headlines always act as anchors which can be referenced from anywhere, while a table of contents will be automatically generated.

Elements, like headlines or paragraphs, can be attached with properties, by appending them the property syntax: `{: .this-is-a-class #this-is-an-id }`. Classes and IDs may then control behavior, like where to insert the TOC, which headlines to exclude from the TOC, custom hash-anchors, etc.

### LaTeX

In order to express domain specific symbols uniformly, the gold standard of TeX will be made use of. TeX expressions can be inlined with plain text by the `$` start and end marker, while multiline expressions are enclosed by `$$`.

### Interactive Scenes

Interactive scenes are defined to be scenes which take in events (pointer move/click, key down/up, zoom, scroll (pan)) and produce a set of drawables, objects which know how to draw themselves on a 2D canvas. Frames can be drawn either on demand, or periodically, according to a specified frame-duration.

Next to events regarding human input devices, a scene may also register input controls, namely sliders, buttons, and textboxes. The text in textboxes can be used as either plain text, or parsed into an AST that corresponds to a mathematical expression, to be evaluated within any given enviroment later on. The range and value of a slider may be adjusted at any time, as all control labels are updatable, all by making use of the control's handle object.

Whether my attempt of such a library will suffice, or whether I need to research and integrate something else is not yet decidable.

What *is* set in stone, is that scenes may only be described by fully-fledged code. Intermediate languages like the "TikZ" package for TeX are nothing but a pain in the butt and take away all of the advantages a computer has to offer. I do not want to calculate coordinate values statically, but rather describe the logic that makes up any given scene in a parameterized fashion.

Currently, a scene is realized in markdown by making use of a `<canvas>` tag with a `script="..."` attribute that points to the JS file which offers a factory method of a scene, to be attached to the canvas when rendered. Whether those script files will be kept as external resources, or inlined into the markdown file has not yet been decided, but the main source-code *needs* to be TS, to make use of intellisense, which then needs to be transpiled into JS when stored on the server.

### Pages

A page consists of a single text file stored within the filesystem of the server, while a unique identifier, a title as well as a file pointer are stored within the database. This way, when referencing other pages, their ID is being refererred to, and thus the title may be edited at any time.

The same ID system should apply to headlines as well, where a headline is uniquely identified by it's size (1-4) and it's sequence number from the very top of the page. This feature will require serverside diffing on updates, to detect inserted or deleted headlines and synchronize the database accordingly.

While pages and headlines are referenced by ID, they may still be searched for by their textual titles manually for reasons of quick and ad-hoc access. Once renamed, somebody else might still hold pieces of the former headline in their head, using them as a mental anchor, and thereby may no longer have quick and easy access to the resource in question. Due to this, it is important to keep a title history, through which a search may then comb to yield results. À la "formerly known as ...", where such results can be ranked lower than current matches, but should still be directly visible.

References to other pages may or may not contain a specific headline, but either way need to be tracked, so that each page becomes aware of it's referrers and malformed or non-existing references are detected and rejected. Pages which are referred to may also no longer be deleted, without deciding how to handle these sites of references first.

### Multilingual Support

It very much is challenging to express thought and emotion using language with attention to detail and in a way that another mental being will construct these impressions so that they may only deviate within an acceptable range from their corresponding original. If the other party is not able to communicate in English at all, or has only very little experience and or vocabulary at their disposal, true understanding will remain an impossible goal.

There are many such individuals all around the globe, who should also be able to access important knowledge, as they make up a part of the population which cannot be left behind if matters are ever to be changed long-term.

While it adds a lot of administrative overhead to manage translations and to keep them in sync with their English counterpart, I'd argue that even an incomplete or an out-of-date translation may still aid understandment. Whenever a page is being updated, its translations become marked as out-of-sync, until updated as well. It should be easy to propose and add new translations, so volunteers may easily offer their help with as little friction as possible.

Since words and even sentences never map one-to-one, translations cannot be validated systematically, but rather depend on trust, and on plausibility-checks based on publicly accessible means of translation.

### Global Map

Pages are spawned within a 2D coordinate system, where an administrator can alter their location to position them in a manner that's visually appealing. References are visualized as lines drawn between pages, where waypoints on lines can be managed manually, as to avoid them becoming a ratsnest. Each page may have a thumbnail as well as a short description which is being shown when hovering the item.

This map can be zoomed in and out of, as well as panned/walked around in. A tag system, as spoken about in [Connecting Minorities](philosophy/connecting-minorities) would come in handy, to provide partial map rendering based on the field and subfields of interest.

I have not yet decided whether I want to host multiple fields of knowledge within the same instance of Arcadia, or whether Arcadia should be "containerized", and each field gets it's own subdomain. Since fields may cross-reference, referential integrity will become a pain between disjoint systems. I still think that a monolith is the way to go, provided that proper filtering functionality exists.

### Jump History

Whenever jumping to any place, a history is kept track of, to be moved backwards and forwards in. This way, a train of thought will be tracked by the computer, and once a page that has been recursed down to has been understood, the journey back up to what was originally studied becomes easier. Some may argue that the browser already keeps this history, but I do not want to have to refresh the page to move around, as that's slow and causes needless refetching and redrawing of still-valid data.

### Rendering

TeX could most definitely be rendered serverside into either MathML and/or SVGs. The same is true for the table of contents. Maybe the whole page should be turned into minified HTML beforehand, so that the client experiences minimal latency when jumping between documents? Are there any advantages of clientside rendering on otherwise "static" documents?

### Efficient Search

Searching needs to be as efficient as possible, to allow for fast-paced jumping. Just like CMD-space opens spotlight on macOS, I'd like to implement a similar on-demand search-bar, which can search for tags and keywords, while providing a thumbnail, the short description, as well as an excerpt of the matches and their vicinity.

I think of Arcadia as an extension to my severly limited mind. I can keep concepts and intuitions in my head easily, but when I need the details, I want to find the page that fully describes what I partially remember as quick as possible.

### Referable Resources

External resources of interest, which may not be accessible forever, should be downloaded and incorporated into the system. To refer to their contents, they need to be transcribed.

#### Books

Thanks to modern OCR as well as to flatbed scanners, books can be scanned and transcribed rather quickly, so that page-, line- and column numbers become available. To refer a passage of a book, one just needs to provide the book ID, as well as a start- and endpoint made up of page-, line- and column numbers. Through this pointer, the content within that range may be inlined into the page as a citation, while a click can take you right to that page within the book.

Images (charts, sketches, graphs, etc.) on pages are kept track of as a sprite, that being their x-,y-offset, as well as their width and height. Per page, sprites are assigned an incrementing number, so they can later be referenced by page- and sprite-number.

#### Video And Audio

The same as for books also holds true for video (YT, etc.) and audio (podcasts, etc.), while the transcriptive process may fall a bit more onto the manual side of things, as ML-detection of voice is still highly erroneous. To refer to a passage of these media, a start- and end-timestamp are provided, which again may inline the spoken content directly into the page, with a hyperlink to the resource at that point.

### Versioning

Each page should be versioned by making use of the trusty `git` system (diff-files, in essence), which thereby attaches a viewable history. Changes should be justified, and it has to be known who is responsible for what change. Thanks to pages consisting of nothing but plain text, this requirement should not be too difficult to implement.