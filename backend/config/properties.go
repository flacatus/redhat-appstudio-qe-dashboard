package config

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v3"
)

// Comment
type ConfigContext struct {
	ConfigSpec *ConfigSpec `json:"config"`
}

// Comment
func GetServerConfiguration(configFile string) (cliContext *ConfigContext, e error) {
	cliInstance, err := readBackendConfiguration(configFile)
	if err != nil {
		return nil, err
	}

	return &ConfigContext{
		ConfigSpec: cliInstance,
	}, nil
}

// Comment
func readBackendConfiguration(configFile string) (instance *ConfigSpec, e error) {
	c := &ConfigSpec{}
	yamlFileContent, err := ioutil.ReadFile(configFile)
	if err != nil {
		return nil, fmt.Errorf("Error on getting configuration file: %v", err)
	}
	err = yaml.Unmarshal(yamlFileContent, c)
	if err != nil {
		return nil, fmt.Errorf("Error marshaling configuration file : %v", err)
	}

	return c, nil
}
