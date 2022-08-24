import axios from 'axios'
import { atom, selector } from 'recoil'


export const articleSlugStore = atom({
    key: 'articleSlug',
    default: []
})

