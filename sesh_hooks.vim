let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/projects/wordgrid-quest
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 ~/Documents/projects/wordgrid-quest
badd +33 src/providers/OverlayProvider.tsx
badd +17 app/(preGameConfig)/_layout.tsx
badd +124 src/theme/themeConfig.ts
badd +35 app/index.tsx
badd +18 src/providers/LogoProvider.tsx
badd +4 src/hooks/useLogo.ts
badd +1 src/contexts/LogoContext.ts
badd +1 src/types/LogoTypes.ts
badd +80 app/_layout.tsx
argglobal
%argdel
$argadd ~/Documents/projects/wordgrid-quest
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit src/types/LogoTypes.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
2wincmd k
wincmd w
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 14 + 23) / 46)
exe 'vert 1resize ' . ((&columns * 62 + 62) / 124)
exe '2resize ' . ((&lines * 14 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 62 + 62) / 124)
exe '3resize ' . ((&lines * 13 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 62 + 62) / 124)
exe 'vert 4resize ' . ((&columns * 61 + 62) / 124)
argglobal
balt src/providers/LogoProvider.tsx
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
let s:l = 5 - ((4 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 0
lcd ~/Documents/projects/wordgrid-quest
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/projects/wordgrid-quest/src/contexts/LogoContext.ts", ":p")) | buffer ~/Documents/projects/wordgrid-quest/src/contexts/LogoContext.ts | else | edit ~/Documents/projects/wordgrid-quest/src/contexts/LogoContext.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/projects/wordgrid-quest/src/contexts/LogoContext.ts
endif
balt ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
let s:l = 3 - ((2 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 0
lcd ~/Documents/projects/wordgrid-quest
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/projects/wordgrid-quest/src/hooks/useLogo.ts", ":p")) | buffer ~/Documents/projects/wordgrid-quest/src/hooks/useLogo.ts | else | edit ~/Documents/projects/wordgrid-quest/src/hooks/useLogo.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/projects/wordgrid-quest/src/hooks/useLogo.ts
endif
balt ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
let s:l = 4 - ((3 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 0
lcd ~/Documents/projects/wordgrid-quest
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx", ":p")) | buffer ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx | else | edit ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx
endif
balt ~/Documents/projects/wordgrid-quest/src/hooks/useLogo.ts
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
20
sil! normal! zo
27
sil! normal! zo
let s:l = 18 - ((17 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 045|
lcd ~/Documents/projects/wordgrid-quest
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 14 + 23) / 46)
exe 'vert 1resize ' . ((&columns * 62 + 62) / 124)
exe '2resize ' . ((&lines * 14 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 62 + 62) / 124)
exe '3resize ' . ((&lines * 13 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 62 + 62) / 124)
exe 'vert 4resize ' . ((&columns * 61 + 62) / 124)
tabnext
edit ~/Documents/projects/wordgrid-quest/app/(preGameConfig)/_layout.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 62) / 124)
exe 'vert 2resize ' . ((&columns * 93 + 62) / 124)
argglobal
enew
file ~/Documents/projects/wordgrid-quest/NvimTree_9
balt ~/Documents/projects/wordgrid-quest/app/(preGameConfig)/_layout.tsx
setlocal foldmethod=manual
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal nofoldenable
lcd ~/Documents/projects/wordgrid-quest
wincmd w
argglobal
balt ~/Documents/projects/wordgrid-quest/src/providers/LogoProvider.tsx
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
12
sil! normal! zo
25
sil! normal! zo
30
sil! normal! zo
33
sil! normal! zo
43
sil! normal! zo
64
sil! normal! zo
let s:l = 7 - ((6 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 052|
lcd ~/Documents/projects/wordgrid-quest
wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 62) / 124)
exe 'vert 2resize ' . ((&columns * 93 + 62) / 124)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
