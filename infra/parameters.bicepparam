using './main.bicep'

param baseName = 'jatt'
param environment = 'dev'
param location = 'eastus2'
param timestamp = readEnvironmentVariable('TIMESTAMP', '19700101_000000')
