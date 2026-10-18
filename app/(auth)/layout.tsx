export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-full grow w-full flex-col justify-center items-center">
      {children}
    </div>
  );
}
