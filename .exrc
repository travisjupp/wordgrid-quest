" ---=== PROJECT LEVEL VIM CONFIG ===---
" To enable your vim/nvim config needs: 
" `set exrc` (init.vim/.vimrc) or `vim.o.exrc = true` (init.lua)
" also `set secure` if you want to block shell commands in local configs 

if has("autocmd")
  augroup ProjectTemplates
    autocmd!
    " Trigger the matching skeleton template based on the extension created
    autocmd BufNewFile **/*.test.js execute '0r ' . expand('<sfile>:p:h') . '/templates/ts-skeleton.test.ts'
    autocmd BufNewFile **/*.test.ts execute '0r ' . expand('<sfile>:p:h') . '/templates/ts-skeleton.test.ts'
    autocmd BufNewFile **/*.test.tsx execute '0r ' . expand('<sfile>:p:h') . '/templates/tsx-skeleton.test.tsx'
  augroup END
endif
