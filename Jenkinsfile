/*
*********************************************************************************************************************
* This is generic PUSH pipeline script for DXC Assure Platform projects.
*
* It can be used as a template for any deploy project as it does not contain references to custom values.
* The specific configuration has to be done through the conf.yml file by setting the correct current repository name.
*
**********************************************************************************************************************
*/

@Library('pdxc-pipeline-lib@assure')

import org.pdxc.util.ValuesUtils
import org.pdxc.jenkins.JenkinsContext

pipelineRunner = null
pipelineUtils = null
configData = null

/**
 * Get the Assure Library source files: configure git and clone the repository. This is always needed to be able to
 * load and use any of the library methods. Please notice that this is not a Jenkins Shared Library, but a repository
 * where the Assure generic functions are stored to be used in combination with the Jenkins Shared Library.
 */
def cloneAndLoadAssurePipeline() {
    configData = readYaml file: 'conf.yml'
    // Set up git
    def cred = ValuesUtils.getVariable(configData, 'gitHubCredential')
    def mail = ValuesUtils.getVariable(configData, 'gitEmail')
    def user = ValuesUtils.getVariable(configData, 'gitUsername')
    def url = ValuesUtils.getVariable(configData, 'gitHubUrl')
    functiongroup_git.setup(cred, mail, user, url)

    // Clone Assure library repo
    def org = ValuesUtils.getVariable(configData, 'libraryOrg')
    def repo = ValuesUtils.getVariable(configData, 'libraryRepo')
    def branch = ValuesUtils.getVariable(configData, 'libraryBranch')
    functiongroup_git.clone(org, repo, branch)

    // Load pipeline for this type of component
    def path = ValuesUtils.getVariable(configData, 'libraryRunnerPath')
    def key = ValuesUtils.getVariable(configData, 'pipelineType')
    def pipelineLoader = load "${repo}${path}"
    pipelineLoader.setContext(this)

    // Get the shared Assure pipeline utils
    pipelineUtils = pipelineLoader.getUtils()

    // Get the pipeline to be run
    pipelineRunner = pipelineLoader.getPipeline(pipelineLoader."${key}")
}

// Initial node to clone the library repo and determine the pipeline to be run.
node {
    sh 'cd /'
    deleteDir()
    checkout scm
    JenkinsContext.setContext(this)
    cloneAndLoadAssurePipeline()
}

def addStagesMegaLinter() {

    // Lint with Mega-Linter: https://nvuillam.github.io/mega-linter/
    stage('Mega-Linter') {
        agent {
            docker {
                image 'nvuillam/mega-linter:v4'
                args "-e VALIDATE_ALL_CODEBASE=true -v ${WORKSPACE}:/tmp/lint --entrypoint=''"
                reuseNode true
            }
        }
        steps {
            sh '/entrypoint.sh'
        }
    }
}

// Add custom stages
def stagesMap = [:]
stagesMap['install'] = ['skip': false, 'func': this.&addStagesMegaLinter]

functions = [:]
pipelineRunner(functions, pipelineUtils)
