"use strict"

const chmod = require("gulp-chmod");
const del = require("del");
const gulp = require("gulp");
const gunzip = require("gulp-gunzip");
const ignore = require("gulp-ignore");
const rename = require("gulp-rename");
const request = require("request");
const source = require("vinyl-source-stream");
const untar = require("gulp-untar");

const dest = {
    vendor: "vendor"
};
const config = {
    dockerDownloadUrl: "https://get.docker.com/builds/Linux/x86_64/docker-1.12.1.tgz",
    jqDownloadUrl: "https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64",
    machineDownloadUrl: "https://github.com/poddworks/machine/releases/download/1.1.0/machine-Linux-x86_64"
};

gulp.task("clean", function() {
    return del([ dest.vendor ]);
});

gulp.task("vendor.docker", function() {
    return request(config.dockerDownloadUrl).
        pipe(source("docker.tgz")).
        pipe(gunzip()).
        pipe(untar()).
        pipe(ignore.include("docker/docker")).
        pipe(rename({ dirname: "" })).
        pipe(chmod(755)).
        pipe(gulp.dest(dest.vendor));
});

gulp.task("vendor.jq", function() {
    return request(config.jqDownloadUrl).
        pipe(source("jq")).
        pipe(chmod(755)).
        pipe(gulp.dest(dest.vendor));
});

gulp.task("vendor.machine", function() {
    return request(config.machineDownloadUrl).
        pipe(source("machine")).
        pipe(chmod(755)).
        pipe(gulp.dest(dest.vendor));
});

gulp.task("vendor", [ "vendor.docker", "vendor.jq", "vendor.machine" ]);

gulp.task("default");
