package config

// Comment
type ConfigContext struct {
	ConfigSpec *ConfigSpec `json:"config"`
}

// Comment
func GetServerConfiguration() (cliContext *ConfigContext) {
	return &ConfigContext{
		ConfigSpec: &ConfigSpec{},
	}
}
