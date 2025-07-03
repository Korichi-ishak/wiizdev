import { BackgroundPaths } from "@/components/ui/background-paths";

export function DemoBackgroundPaths() {
    return <BackgroundPaths title="Ready to Build Something Amazing" />
}

const DemoOne = () => {
  return <DemoBackgroundPaths />;
};

export { DemoOne };