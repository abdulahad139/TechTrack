function imageOpener(name) {
    return new URL(`../components/Assets/Roadmaps/${name}.png`, import.meta.url).href
}

export {imageOpener};