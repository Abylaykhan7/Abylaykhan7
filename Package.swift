// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "LiverpoolFanApp",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .library(
            name: "LiverpoolFanApp",
            targets: ["LiverpoolFanApp"]),
    ],
    dependencies: [
        // Add any third-party dependencies here
    ],
    targets: [
        .target(
            name: "LiverpoolFanApp",
            dependencies: []),
    ]
)
