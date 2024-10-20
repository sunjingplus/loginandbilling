const fs = require('fs');
const path = require('path');
const { simpleGit } = require('simple-git');

// GitHub 仓库信息（替换为你的仓库地址）
const REPO_URL = 'https://github.com/sunjingplus/loginandbilling.git';
const BRANCH = 'main';

// 项目路径配置
const ROOT = 'D:\\before\\next\\testloginandbilling'; // 转义反斜杠
const TEMP_DIR = path.join(ROOT, 'temp-repo'); // 临时目录路径

const PATHS = {
  app: path.join(ROOT, 'app'),
  api: path.join(ROOT, 'app', 'api'),
  pricing: path.join(ROOT, 'app', 'pricing'),
  components: path.join(ROOT, 'components'),
  userLogin: path.join(ROOT, 'components', 'userLogin'),
  db: path.join(ROOT, 'db'),
  drizzleConfig: path.join(ROOT, 'drizzle.config.ts'),
};

// 克隆仓库到临时目录
const cloneRepo = async (dest) => {
  const git = simpleGit();
  console.log('正在克隆仓库...');
  await git.clone(REPO_URL, dest, [`--branch=${BRANCH}`]);
  console.log('仓库克隆完成！');
};

// 检查并创建文件夹
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.log(`文件夹不存在，正在创建：${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`文件夹已存在：${dirPath}`);
  }
};

// 复制文件或文件夹
const copyContents = (src, dest) => {
  if (fs.statSync(src).isDirectory()) {
    ensureDir(dest); // 确保目标文件夹存在

    fs.readdirSync(src).forEach((file) => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      if (fs.statSync(srcFile).isDirectory()) {
        // 如果是文件夹，递归处理
        copyContents(srcFile, destFile);
      } else {
        // 如果是文件，检查是否已存在
        if (!fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
          console.log(`复制文件：${srcFile} 到 ${destFile}`);
        } else {
          console.log(`跳过文件：${destFile}，因为它已经存在。`);
        }
      }
    });
  }
};

// 主逻辑
(async () => {
  try {
    // 如果临时目录已存在，删除它
    if (fs.existsSync(TEMP_DIR)) {
      console.log(`临时目录已存在，正在删除：${TEMP_DIR}`);
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }

    // 克隆仓库
    await cloneRepo(TEMP_DIR);

    // 检查并创建必要目录
    ensureDir(PATHS.app);
    ensureDir(PATHS.db);
    ensureDir(PATHS.components);

    // 处理各个文件夹
    const foldersToCopy = ['api', 'pricing', 'userLogin', 'db'];

    for (const folder of foldersToCopy) {
      const tempFolderPath = path.join(TEMP_DIR, folder);
      const targetFolderPath = PATHS[folder] || path.join(PATHS.components, folder);
      
      if (fs.existsSync(targetFolderPath)) {
        console.log(`${folder} 文件夹已存在，复制内容...`);
        copyContents(tempFolderPath, targetFolderPath);
      } else {
        fs.renameSync(tempFolderPath, targetFolderPath);
      }
    }

    // 处理其他文件
    fs.renameSync(path.join(TEMP_DIR, 'drizzle.config.ts'), PATHS.drizzleConfig);

    // 删除临时目录
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });

    console.log('✅ 所有文件和文件夹已成功复制到项目中！');
  } catch (error) {
    console.error('❌ 操作失败：', error);
  }
})();
