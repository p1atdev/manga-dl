FROM denoland/deno:1.20.1

# The port that your application listens to.
ENV PORT=1993
EXPOSE ${PORT}

WORKDIR /app

# Install velociraptor.
# RUN deno install -qAn vr https://deno.land/x/velociraptor@1.4.0/cli.ts

# Prefer not to run as root.
# USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

CMD ["run", "-A", "server.ts"]