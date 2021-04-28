# 报价系统代码贡献指南

## 文件名约束

1. 文件目录均使用**小写**，文件名使用大写，当文件名和目录具有多个单词的语义时，文件名用下划线，目录用连接符

```text
test.js -> good
test_file.js -> good
test-file-> good

testFile.js -> bad
```

2. 文件目录下的所有子文件，如果具有明显的父子关系，例如，controller下的所有文件都是具体业务类型的controller，对此，我们需要给每个文件一个统一的后缀。后缀的取名规则推荐使用目录单词的简写，例如，controller缩写为ctl。也可以使用目录的全称。

```text
// good
controller
    + login-ctl.js
    + sign-ctl.js
    ...

// bad
controller
    + login.js
    + sign.js
```