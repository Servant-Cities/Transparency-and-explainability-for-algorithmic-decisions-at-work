module.exports = {
    apps: [
      {
        name: "staging-microsite",
        cwd: ".",
        script: "yarn",
        args: "run dev",
        autorestart: true,
        listen_timeout: 60000,
      },
    ],
  };