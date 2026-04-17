using './main.bicep'

param baseName = 'jatt'
param environment = 'pr'
param location = 'westus2'
param timestamp = readEnvironmentVariable('TIMESTAMP', '19700101_000000')
