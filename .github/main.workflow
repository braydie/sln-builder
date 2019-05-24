workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Publish" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
