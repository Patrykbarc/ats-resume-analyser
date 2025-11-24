clean_monorepo() {
    echo "--- Starting Monorepo Cleanup ---"

    echo "1/3: Removing all 'node_modules' folders..."
    find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

    echo "2/3: Removing all build output folders ('dist', 'build')..."
    find . -type d \( -name "dist" -o -name "build" \) -prune -exec rm -rf '{}' +

    echo "3/3: Removing all lock files (pnpm-lock.yaml, package-lock.json, yarn.lock)..."
    find . -type f \( -name "pnpm-lock.yaml" -o -name "package-lock.json" -o -name "yarn.lock" \) -delete

    echo "--- Cleanup Complete! You can now run 'pnpm install' ---"
}

read -r -p "⚠️ WARNING: This will permanently delete all node_modules, dist, build, and lock files in the current directory and its subdirectories. Are you sure you want to proceed? (y/N) " response

case "$response" in
    [yY][eE][sS]|[yY])
        clean_monorepo
        ;;
    *)
        echo "Cleanup cancelled by user."
        ;;
esac