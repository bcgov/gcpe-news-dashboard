// Edit your app's name below
APP_NAME = "news-dashboard"
PROJECT_NAMESPACE = "ntu9uh"

class AppEnvironment {
  String name
  String tag
  String previousTag
}

// EDIT LINE BELOW (Edit your environment TAG names)
environments = [
  dev:new AppEnvironment(name:"Development",tag:"dev",previousTag:"dev-previous"),
  test:new AppEnvironment(name:"Test",tag:"test",previousTag:"test-previous"),
  prod:new AppEnvironment(name:"Prod",tag:"prod",previousTag:"prod-previous")
]

// You shouldn't have to edit these if you're following the conventions
ARTIFACT_BUILD = APP_NAME
RUNTIME_CHAINED_BUILD = "${APP_NAME}-static"

// EDIT LINE BELOW (Change `IMAGESTREAM_NAME` so it matches the name of your *output*/deployable image stream.)
IMAGESTREAM_NAME = "${APP_NAME}-static"

PATHFINDER_URL = "pathfinder.gov.bc.ca"

// EDIT LINE BELOW (Add a reference to the YARN_BUILD, the builder image that compiles your frontend source code.)
YARN_BUILD = "frontend-yarn-builder"

// EDIT LINE BELOW:
// Add a reference to the NGINX_BUILD, if you are using a runtime that needs to be built.
// Otherwise comment out the line and the associated build script.
NGINX_BUILD = "frontend-nginx-runtime"

// Gets the container hash for the latest image in an image stream
def getLatestHash(imageStreamName) {
  return sh (
    script: """oc get istag ${imageStreamName}:latest -o=jsonpath='{@.image.metadata.name}' | sed -e 's/sha256://g'""",
    returnStdout: true
  ).trim()
}

// Gets all tags already applied to this ImageStream (as a single string); e.g., 'dev test dev-previous my-other-tag ...'
def getAllTags(imageStreamName) {
  return sh (
    script: """oc get is ${imageStreamName} -o template --template='{{range .status.tags}}{{" "}}{{.tag}}{{end}}'""",
    returnStdout: true
  ).trim()
}

// Checks whether we are running this pipeline for the first time by looking at what tags are available on the application's ImageStream
def tagExists(tagName, imageStream) {
  def tags = getAllTags(imageStream)
  def entries = tags.split(" ")
  for (entry in entries) {
    if (entry == tagName) {
      return true
    }
  }
  return false
}

def buildAndVerify(buildConfigName) {
  echo "Building: ${buildConfigName}"
  openshiftBuild(
    bldCfg: buildConfigName,
    showBuildLogs: 'true',
    waitTime: '900000'
  )
  openshiftVerifyBuild(
    bldCfg: buildConfigName,
    showBuildLogs: 'true',
    waitTime: '900000'
  )
}

def tagImage(srcHash, destination, imageStream) {
  openshiftTag(
    destStream: imageStream,
    verbose: 'true',
    destTag: destination,
    srcStream: imageStream,
    srcTag: srcHash,
    waitTime: '900000'
  )
}

// Keeps a copy of last good known configuration for a deployment (just in case)
def tagLatestStable(environment, backupTag, imageStream) {
  // skip this on the first run... there's nothing to backup!
  if (tagExists(environment, imageStream)) {
    tagImage(environment, backupTag, imageStream)
  }
}

def deployAndVerify(srcHash, environment, imageStream) {
  echo "Deploying ${APP_NAME} to ${environment}"
  tagImage(srcHash, environment, imageStream)
  // verify deployment to an environment; e.g. [your-project-name]-dev
  openshiftVerifyDeployment(
    deploymentConfig: APP_NAME,
    namespace: "${PROJECT_NAMESPACE}-${environment}",
    waitTime: '900000'
  )
}

// Generates a string representation of the current code changes that triggered a build
def getChangeString() {
  def MAX_MSG_LEN = 512
  def changeString = ""
  def changeLogSets = currentBuild.changeSets
  for (int i = 0; i < changeLogSets.size(); i++) {
     def entries = changeLogSets[i].items
     for (int j = 0; j < entries.length; j++) {
         def entry = entries[j]
         truncated_msg = entry.msg.take(MAX_MSG_LEN)
         changeString += " - ${truncated_msg} [${entry.author}]\n"
     }
  }
  if (!changeString) {
     changeString = "No changes"
  }
  return changeString
}

def notifyGood(title, description) {
  // TODO: Send notifications to Slack
  echo title
  if (description) {
    echo description
  }
}

def notifyError(title, description) {
  // TODO: Send notifications to Slack
  echo title
  if (description) {
    echo description
  }
}

/* Setup stage
    - making sure builder images are available (i.e. yarn-builder, nginx-runtime)
*/
stage('Assemble Builder & Runtime') {
  node {
    // Assemble Yarn Builder
    try {
      buildAndVerify(YARN_BUILD)
    } catch(error) {
      notifyError(
        "Problem Assembling Yarn Builder",
        "Error: ${error.message}"
      )
      throw error
    }

    // Assemble Nginx Runtime
    try {
      buildAndVerify(NGINX_BUILD)
    } catch(error) {
      notifyError(
        "Problem Assembling Nginx Runtime",
        "Error: ${error.message}"
      )
      throw error
    }
  }
}

/* Chained Build stage
    - applying OpenShift build configs
    - creating OpenShift imagestreams, annotations and builds
    - build time optimizations (e.g. image reuse, build scheduling/readiness)
*/
stage("Build ${APP_NAME}") {
  node{
    try {
      // trigger the Artifact build and runtime build
      buildAndVerify(ARTIFACT_BUILD)
      buildAndVerify(RUNTIME_CHAINED_BUILD)

      // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
      // Tag the images for deployment based on the image's hash
      IMAGE_HASH = getLatestHash(IMAGESTREAM_NAME)
      echo ">> IMAGE_HASH: ${IMAGE_HASH}"

    } catch(error) {
      notifyError(
        "${APP_NAME} Build Broken :(",
        "Author: ${env.CHANGE_AUTHOR_DISPLAY_NAME}\r\nError: '${error.message}'"
      )
      throw error
    }
  }
}

/* Deploying to DEV
    - backing up latest stable deployment
    - deploying newly built image
    - notifying of success or failure
*/
stage("Deploy to ${environments.dev.name}") {
  def environment = environments.dev.tag
  def stableTag = environments.dev.previousTag
  node {
    try {
      // hold on to a copy of the last stable DEV environment (in case the upcoming deployment fails...)
      tagLatestStable(environment, stableTag, IMAGESTREAM_NAME)
      deployAndVerify(IMAGE_HASH, environment, IMAGESTREAM_NAME)
      // all is good!
      notifyGood(
        "New ${APP_NAME} in ${environment} :)",
        "Changes: ${getChangeString()}"
      )
    } catch(error) {
      notifyError(
        "Couldn't deploy ${APP_NAME} to ${environment} :(",
        "Error: '${error.message}'"
      )
      throw error
    }
  }
}

/* Deploying to TEST
    - backing up latest stable deployment
    - deploying newly built image
    - notifying of success or failure
*/
stage("Deploy to ${environments.test.name}") {
  def environment = environments.test.tag
  def stableTag = environments.test.previousTag
  timeout(time:4, unit: 'HOURS'){ input "Deploy to ${environment}?"}
  node {
    try {
      // hold on to a copy of the last stable DEV environment (in case the upcoming deployment fails...)
      tagLatestStable(environment, stableTag, IMAGESTREAM_NAME)
      deployAndVerify(IMAGE_HASH, environment, IMAGESTREAM_NAME)
      // all is good!
      notifyGood(
        "New ${APP_NAME} in ${environment} :)",
        "Changes: ${getChangeString()}"
      )
    } catch(error) {
      notifyError(
        "Couldn't deploy ${APP_NAME} to ${environment} :(",
        "Error: '${error.message}'"
      )
      throw error
    }
  }
}

//See https://github.com/jenkinsci/kubernetes-plugin
podTemplate(label: 'owasp-zap', name: 'owasp-zap', serviceAccount: 'jenkins', cloud: 'openshift', containers: [
  containerTemplate(
    name: 'jnlp',
    image: '172.50.0.2:5000/openshift/jenkins-slave-zap',
    resourceRequestCpu: '500m',
    resourceLimitCpu: '1000m',
    resourceRequestMemory: '3Gi',
    resourceLimitMemory: '4Gi',
    workingDir: '/tmp',
    command: '',
    args: '${computer.jnlpmac} ${computer.name}'
  )
]) {
     node('owasp-zap') {
       stage('ZAP Security Scan') {
         dir('/zap') {
                def retVal = sh returnStatus: true, script: '/zap/zap-baseline.py -r baseline.html -t https://dev.dashboard.news.gov.bc.ca/last-7-day-post-list'
                publishHTML(target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: '/zap/wrk', reportFiles: 'baseline.html', reportName: 'ZAP Baseline Scan', reportTitles: 'ZAP Baseline Scan'])
                echo "Return value is: ${retVal}"
         }
       }
     }
}
