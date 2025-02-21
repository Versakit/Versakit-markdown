import { V as r, a as o, b as l } from './chunks/theme.vbnXbHne.js'
import {
  c as m,
  G as e,
  w as a,
  k as i,
  o as u,
  a as n,
} from './chunks/framework.dB56A39y.js'
const v = JSON.parse(
    '{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"team.md","filePath":"team.md"}',
  ),
  c = { name: 'team.md' },
  d = Object.assign(c, {
    setup(p) {
      const s = [
        {
          avatar: 'https://avatars.githubusercontent.com/u/122306263?v=4',
          name: 'JustHappy',
          title: ' Creator',
          links: [{ icon: 'github', link: 'https://github.com/Simonmie' }],
        },
        {
          avatar:
            'https://avatars.githubusercontent.com/u/74483049?s=400&u=102dfac48d0067d9d7a5576134e409590bbfaafe&v=4',
          name: 'Jannik',
          title: 'Developer',
          links: [{ icon: 'github', link: 'https://github.com/lenran659' }],
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/131731035?v=4',
          name: 'Pei',
          title: 'UI Designer | Developer',
          links: [{ icon: 'github', link: 'https://github.com/Dream-2022' }],
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/184910937?v=4',
          name: 'StriveToLearnCode',
          title: 'Developer',
          links: [
            { icon: 'github', link: 'https://github.com/StriveToLearnCode' },
          ],
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/86543671?v=4',
          name: 'abining',
          title: 'Developer',
          links: [
            {
              icon: 'github',
              link: 'https://github.com/abining?tab=repositories',
            },
          ],
        },
      ]
      return (h, t) => (
        u(),
        m('div', null, [
          e(i(l), null, {
            default: a(() => [
              e(i(r), null, {
                title: a(() => t[0] || (t[0] = [n('团队成员')])),
                lead: a(
                  () => t[1] || (t[1] = [n(' 我们是一群热爱开源的人。 ')]),
                ),
                _: 1,
              }),
              e(i(o), { size: 'small', members: s }),
            ]),
            _: 1,
          }),
        ])
      )
    },
  })
export { v as __pageData, d as default }
