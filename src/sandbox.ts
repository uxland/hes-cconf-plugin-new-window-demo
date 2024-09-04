import "@uxland/hes-cconf-shell/dist/style.css";
import { bootstrapPlugins, initializeShell,hesCConfApiFactory,IHESCConfSection,PluginDefinition } from "@uxland/hes-cconf-shell";

const buildHarmonixPlugins = (configurationSections: IHESCConfSection[]) => { 
  const plugins = configurationSections
    .map((c) => c.plugins)
    .flat()
    .map((p) => {
      return {
        pluginId: p.pluginId,
        importer: ()=>import(p.pluginUrl),
      };
    });
  return plugins;
}

export const getConfigurationsAndPlugins = async () => {
  const configurationSections = await fetchConfigurations();
  const plugins = buildHarmonixPlugins(configurationSections) as PluginDefinition[];
  return {configurationSections, plugins};
};


export const fetchConfigurations = () => {
    return Promise.resolve([
        {
            id: "notifications",
            name: "Notificacions",
            description: "Configuració i manteniment de notificacions i alertes",
            icon: "notification",
            tags: ["configurations"],
            plugins: [
              {
                    pluginId: "patient-notifications-iframe",
                    pluginUrl: "./plugin",
                    name: "Notificacions del pacient iframe",
                    category: ["user", "admin"]
              }
            ],
        },
    ]);
}


export const createAndAppendSandboxApp = () => {
  const app = document.createElement("hes-cconf-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("hes-cconf-app");
  return sandbox;
};

export const initializeSandboxApp = async (sandbox: HTMLElement) => {
  try {
      if (sandbox) {
        const {configurationSections, plugins} = await getConfigurationsAndPlugins();
        initializeShell(sandbox as HTMLElement,configurationSections);
        bootstrapPlugins(plugins, hesCConfApiFactory);
    }
  } catch (error) {
    console.warn(error);
  }
};

const sandbox = createAndAppendSandboxApp() as HTMLElement;
initializeSandboxApp(sandbox);