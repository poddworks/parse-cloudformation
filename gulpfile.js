"use strict"

const chmod = require("gulp-chmod");
const del = require("del");
const gulp = require("gulp");
const request = require("request");
const source = require("vinyl-source-stream");

const dest = {
    venv: ".venv",
    vendor: "vendor"
};
const config = {
    machineDownloadUrl: "https://github.com/poddworks/machine/releases/download/1.0.0/machine-Linux-x86_64"
};

gulp.task("clean", function() {
    return del([ dest.vendor, dest.venv ]);
});

gulp.task("vendor.machine", function() {
    return request(config.machineDownloadUrl).
        pipe(source("machine")).
        pipe(chmod(755)).
        pipe(gulp.dest(dest.vendor));
});

gulp.task("vendor", [ "vendor.machine" ]);

gulp.task("default", [ "vendor" ]);
