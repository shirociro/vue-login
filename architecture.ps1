# Create Vue 3 project structure from React app

# Root src folder
$root = "src"

# Define folders
$folders = @(
    "$root\api",
    "$root\app",
    "$root\layouts",
    "$root\modules\tasks\components",
    "$root\modules\tasks\composables",
    "$root\modules\tasks\services",
    "$root\modules\tasks\stores",
    "$root\modules\users\components",
    "$root\modules\users\composables",
    "$root\modules\users\services",
    "$root\modules\users\stores",
    "$root\shared\components",
    "$root\shared\composables",
    "$root\shared\stores"
)

# Define files
$files = @(
    "$root\api\axios.ts",
    "$root\app\App.vue",
    "$root\app\router.ts",
    "$root\layouts\AdminLayout.vue",
    "$root\modules\tasks\index.vue",
    "$root\modules\tasks\components\Card.vue",
    "$root\modules\tasks\components\Grid.vue",
    "$root\modules\tasks\components\TaskAdd.vue",
    "$root\modules\tasks\components\TaskDelete.vue",
    "$root\modules\tasks\components\TaskEdit.vue",
    "$root\modules\tasks\composables\useTasks.ts",
    "$root\modules\tasks\services\tasks.service.ts",
    "$root\modules\tasks\stores\tasks.store.ts",
    "$root\modules\users\index.vue",
    "$root\modules\users\components\Card.vue",
    "$root\modules\users\components\Grid.vue",
    "$root\modules\users\components\UserAdd.vue",
    "$root\modules\users\components\UserDelete.vue",
    "$root\modules\users\components\UserEdit.vue",
    "$root\modules\users\composables\useUsers.ts",
    "$root\modules\users\services\users.service.ts",
    "$root\modules\users\stores\users.store.ts",
    "$root\shared\components\Alert.vue",
    "$root\shared\components\Sidebar.vue",
    "$root\shared\composables\useIsOnline.ts",
    "$root\shared\stores\index.store.ts",
    "main.ts",
    "index.html",
    "vite.config.ts",
    "package.json"
)

# Create folders
foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
}

# Create empty files
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
    }
}

Write-Host "Vue project skeleton created successfully!"